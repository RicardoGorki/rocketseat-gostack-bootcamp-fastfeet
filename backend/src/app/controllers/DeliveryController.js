import * as Yup from 'yup';
import { startOfDay, endOfDay } from 'date-fns';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryController {
  async index(req, res) {
    const delivery = await Delivery.findAll({
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
    });

    return res.json({ delivery });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const recipientExist = await Recipient.findByPk(recipient_id);

    if (!recipientExist) {
      return res.status(400).json({ error: 'Recipient does not exist.' });
    }

    const deliverymanExist = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExist) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const start_date = startOfDay(new Date());

    await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
      start_date,
    });

    return res.json({
      recipient_id,
      deliveryman_id,
      product,
      start_date,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      avatar_id: Yup.string(),
      email: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return res.json({});
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(401).json({ error: 'Recipient do not found.' });
    }
    delivery.destroy();
    return res.json({ message: 'Recipient deleted' });
  }
}

export default new DeliveryController();
