import * as mongoose from 'mongoose';

export enum Genre {
  AbsurdistSurrealWhimsical = 'Absurdist/surreal/whimsical',
  Action = 'Action',
  Adventure = 'Adventure',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Drama = 'Drama',
  Documentary = 'Documentary',
  Fantasy = 'Fantasy',
  Historical = 'Historical',
  HistoricalFiction = 'HistoricalFiction',
  Horror = 'Horror',
  MagicalRealism = 'MagicalRealism',
  Mystery = 'Mystery',
  ParanoidFiction = 'ParanoidFiction',
  Philosophical = 'Philosophical',
  Political = 'Political',
  Romance = 'Romance',
  Saga = 'Saga',
  Satire = 'Satire',
  ScienceFiction = 'ScienceFiction',
  Social = 'Social',
  Speculative = 'Speculative',
  Thriller = 'Thriller',
  Urban = 'Urban',
  Western = 'Western',
}

export const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
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
