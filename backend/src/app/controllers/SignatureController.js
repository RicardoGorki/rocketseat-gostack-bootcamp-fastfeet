import * as Yup from 'yup';

import Delivery from '../models/Delivery';

class SignatureController {
  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    const { signature_id } = req.body;

    if (delivery.canceled_at) {
      return res
        .status(401)
        .json({ error: 'You cannot deliver a canceled order' });
    }

    const endDate = new Date();

    await delivery.update({ signature_id, end_date: endDate });

    return res.json(delivery);
  }
}

export default new SignatureController();
