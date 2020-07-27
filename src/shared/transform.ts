import { IUser } from '../modules/users/interfaces/user.interface';
import { IMovie } from '../modules/movies/interfaces/movie.interface';

export const toUser = (user: IUser) => ({
  id: user.id,
  username: user.username,
  sex: user.sex,
  age: user.age,
});

export const toMovie = (movie: IMovie) => ({
  id: movie.id,
  title: movie.title,
  description: movie.description,
  release: movie.release,
  director: movie.director,
  genre: movie.genre,
  createdBy: movie.createdBy,
  createdAt: movie.createdAt,
});
