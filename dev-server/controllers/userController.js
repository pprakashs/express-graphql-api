import User from '../models/userModel';

export const getAllUser = async () => {
    const users = await User.find({});
    return users;
}