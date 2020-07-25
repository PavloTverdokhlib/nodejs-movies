import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovie } from '../models/movie.model';
import {
  IDeleteRequestResponse,
  IQuery,
  Paginated,
  Status,
} from '../shared/interfaces';
import { MovieDto } from '../models/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<IMovie>,
  ) {}

  public async getMovies(query: IQuery): Promise<Paginated<IMovie[]>> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 1;
    const movies = await this.movieModel.find().exec();
    const filteredItems = movies.filter(m =>
      this.filterBy(m, ['title', 'description'], query.search),
    );
    return {
      page,
      limit,
      total: filteredItems.length,
      value: filteredItems.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      ),
    };
  }

  public async getMovie(id: string): Promise<IMovie> {
    const movie = await this.findMovie(id);
    return movie;
  }

  public createMovie(data: MovieDto): Promise<IMovie> {
    const newMovie = new this.movieModel(data);
    return newMovie.save();
  }

  public async updateMovie(id: string, data: IMovie): Promise<IMovie> {
    const movie = await this.findMovie(id);
    Object.keys(data).forEach(key => {
      if (data[key]) {
        movie[key] = data[key];
      }
    });
    const updatedMovie = await movie.save();
    return updatedMovie;
  }

  public async deleteMovie(id: string): Promise<IDeleteRequestResponse> {
    const result = await this.movieModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find movie.');
    }
    return { status: Status.DELETED };
  }

  private async findMovie(id: string): Promise<IMovie> {
    let movie;
    try {
      movie = await this.movieModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException("Could not find movie.");
    }
    if (!movie) {
      throw new NotFoundException("Could not find movie.");
    }
    return movie;
  }

  private filterBy = (
    item: IMovie,
    keys: string[],
    search: string,
  ): boolean => {
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
