import * as mongoose from 'mongoose';

export enum Genre {
  Action = 'Action',
  Adventure = 'Adventure',
  Documentary = 'Documentary',
}

export const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  release: { type: Date, required: true },
  director: { type: String, required: true },
  genre: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export interface IMovie extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  release: Date;
  director: string;
  genre: Genre;
  createdBy: string;
  createdAt: Date;
}
