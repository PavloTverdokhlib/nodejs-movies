import { IUser } from '../modules/users/interfaces/user.interface';

export const toUser = (user: IUser) => ({
  id: user.id,
  username: user.username,
  sex: user.sex,
  age: user.age,
});
