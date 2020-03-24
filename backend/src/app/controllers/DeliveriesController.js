import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  isAfter,
  isBefore,
  setSeconds,
  setMinutes,
  setHours,
  startOfDay,
  endOfDay,
} from 'date-fns';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        signature_id: null,
        canceled_at: null,
      },
      includes: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'recipient_id',
            'signature_id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
        },
      ],
    });

    return res.json({ delivery });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      canceled_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const deliveryId = req.params.id;

    const deliveries = await Delivery.findByPk(deliveryId);

    const deliveryman = deliveries.deliveryman_id;

    const startDate = new Date();

    const dateAfter = setSeconds(setMinutes(setHours(startDate, 8), 0), 0);
    const dateBefore = setSeconds(setMinutes(setHours(startDate, 18), 0), 0);

    const checkHours =
      isAfter(startDate, dateAfter) && isBefore(startDate, dateBefore);

    if (!checkHours) {
      return res.status(401).json({
        error: 'Orders can only be picked up from 08:00 am to 18:00 pm',
      });
    }

    const checkDeliveryLimit = await Delivery.findAll({
      where: {
        canceled_at: null,
        signature_id: null,
        deliveryman_id: deliveryman,
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      },
    });

    if (checkDeliveryLimit.length >= 5) {
      return res
        .status(401)
        .json({ error: 'Dear deliver, you can only deliver 5 orders per day' });
    }

    await deliveries.update({ start_date: startDate });

    return res.json(deliveries);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    delivery.destroy();

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery do not found.' });
    }

    const registrationMail = delivery;

    await Queue.add(DeliveryDeletedMail.key, {
      registrationMail,
    });

    return res.json({ delivery, message: 'Delivery deleted' });
  }
}

export default new DeliveryController();
