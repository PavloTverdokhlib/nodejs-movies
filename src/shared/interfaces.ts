import { Genre } from '../modules/movies/interfaces/movie.interface';

export interface IQuery {
  search?: string;
  genre?: Genre;
  limit?: string;
  page?: string;
}

export enum Status {
  DELETED = 'Deleted',
}

export interface IDeleteRequestResponse {
  status: string;
}

export interface Paginated<T> {
  page: number;
  limit: number;
  total: number;
  next: string;
  value: T;
}

export interface ILoginResponse {
  access_token: string;
}
