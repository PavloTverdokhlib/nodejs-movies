import { Injectable } from '@nestjs/common';
import { Movie } from '../models/movie.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MoviesService {
  public movies: Movie[] = [];

  public getMovies(query: any): Movie[] {
    return this.movies.filter(m => {
      const search = query.search;
      if (!search) {
        return true;
      }
      return (
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  public createMovie(data: Movie): Movie {
    const newMovie = new Movie(
      uuidv4(),
      data.title,
      data.description,
      data.release,
      data.director,
      data.genre,
    );

    this.movies.push(newMovie);

    return newMovie;
  }
}
