import * as mongoose from 'mongoose';

export enum Sex {
  Man = 'Man',
  Woman = 'Woman',
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
});

export interface IUser extends mongoose.Document {
  id: string;
  username: string;
  password?: string;
  sex: Sex;
  age: number;
}