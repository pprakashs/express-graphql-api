import User from '../models/userModel';
import { checkAuth } from './auth';

const userCtrl = {
  getMe: async (req) => {
    return checkAuth(req);
  },
};

export default userCtrl;
