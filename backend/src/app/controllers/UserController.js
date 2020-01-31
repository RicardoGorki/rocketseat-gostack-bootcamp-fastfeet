import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async index(req, res) {
    res.json({ error: 'birl' });
  }
}

export default new UserController();
