import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../models/movie.model';
import { v4 as uuidv4 } from 'uuid';
import {
  IDeleteRequestResponse,
  IQuery,
  Paginated,
  Status,
} from '../shared/interfaces';
import { predefinedMovies } from '../mocks';
import { MovieDto } from '../models/movie.dto';

@Injectable()
export class MoviesService {
  public movies: Movie[] = predefinedMovies;

  public getMovies(query: IQuery): Paginated<Movie[]> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 1;
    return {
      page,
      limit,
      total: this.movies.length,
      value: this.movies
        .slice((page - 1) * limit, (page - 1) * limit + limit)
        .filter(m => this.filterBy(m, ['title', 'description'], query.search)),
    };
  }

  public getMovie(id: string): Movie {
    const [movie] = this.findMovie(id);
    return movie;
  }

  public createMovie(data: MovieDto): Movie {
    const newMovie = new Movie({ id: uuidv4(), ...data });
    this.movies.push(newMovie);
    return newMovie;
  }

  public updateMovie(id: string, data: Movie): Movie {
    const [movie, index] = this.findMovie(id);
    const updatedMovie = { ...movie };
    Object.keys(data).forEach(key => {
      if (data[key] && updatedMovie.hasOwnProperty(key)) {
        updatedMovie[key] = data[key];
      }
    });
    this.movies[index] = updatedMovie;
    return updatedMovie;
  }

  public deleteMovie(id: string): IDeleteRequestResponse {
    const index = this.findMovie(id)[1];
    this.movies.splice(index, 1);
    return { status: Status.DELETED };
  }

  private findMovie(id: string): [Movie, number] {
    const movieIndex = this.movies.findIndex(m => m.id === id);
    const movie = this.movies[movieIndex];
    if (!movie) {
      throw new NotFoundException("Can't find movie.");
    }
    return [movie, movieIndex];
  }

  private filterBy = (item: Movie, keys: string[], search: string): boolean => {
    if (!search) {
      return true;
    }
    return keys.some(
      key =>
        item.hasOwnProperty(key) &&
        item[key].toLowerCase().includes(search.toLowerCase()),
    );
  };
}
