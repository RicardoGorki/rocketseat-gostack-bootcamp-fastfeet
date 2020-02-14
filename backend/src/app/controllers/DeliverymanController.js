import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'avatar_id', 'email'],
    });

    return res.json({ deliveryman });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string().required(),
      email: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json({ deliveryman });
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

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    await deliveryman.update(req.body);

    return res.json({ deliveryman });
  }

  async delete(req, res) {
    const delivery = await Deliveryman.findByPk(req.params.id);

    if (!delivery) {
      return res.status(401).json({ error: 'Recipient do not found.' });
    }
    delivery.destroy();
    return res.json({ message: 'Recipient deleted' });
  }
}

export default new DeliverymanController();
