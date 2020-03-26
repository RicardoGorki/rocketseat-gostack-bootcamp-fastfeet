import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblemMail from '../jobs/DeliveryProblemMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async show(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll();
    return res.json(deliveryProblems);
  }

  async index(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(401).json({ error: 'Delivery does not exists.' });
    }

    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: id },
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id } = req.params;
    const { description } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery does not exists.' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      description,
      delivery_id: id,
    });
    return res.json(deliveryProblem);
  }

  async update(req, res) {
    const { id } = req.params;

    const deliveryProblems = await DeliveryProblem.findByPk(id, {
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'canceled_at'],
        },
      ],
    });

    const { description } = deliveryProblems;

    const delivery = await Delivery.findByPk(deliveryProblems.delivery.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    const canceledDate = new Date();

    await delivery.update({ delivery, canceled_at: canceledDate });

    const registrationMail = await Delivery.findByPk(delivery.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Queue.add(DeliveryProblemMail.key, {
      registrationMail,
      description,
    });
    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
