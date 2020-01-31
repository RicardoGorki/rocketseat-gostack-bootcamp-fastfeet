import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll({
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'postcode',
      ],
    });

    return res.json({ recipients });
  }

  async store(req, res) {
    return res.json({ error: 'error' });
  }

  async update(req, res) {
    return res.json({ error: 'error' });
  }

  async delete(req, res) {
    return res.json({ error: 'error' });
  }
}

export default new RecipientController();
