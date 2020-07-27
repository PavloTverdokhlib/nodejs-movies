import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IDeleteRequestResponse,
  IQuery,
  Paginated,
  Status,
} from '../../shared/interfaces';
import { IMovie } from './interfaces/movie.interface';
import { MovieDto } from './dto/movie.dto';
import { IUser } from '../users/interfaces/user.interface';

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

  public createMovie(data: MovieDto, user: IUser): Promise<IMovie> {
    const newMovie = new this.movieModel({
      ...data,
      createdBy: user.username,
      createdAt: new Date(),
    });
    return newMovie.save();
  }

  public async updateMovie(id: string, data: IMovie): Promise<IMovie> {
    const movie = await this.findMovie(id);
    Object.keys(data).forEach(key => {
      if (key === 'createdBy' || key === 'createdAt') {
        throw new BadRequestException(`${key} is restricted for update`);
      } else if (data[key]) {
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
    try {
      const movie = await this.movieModel.findById(id).exec();
      if (!movie) {
        throw new Error();
      }
      return movie;
    } catch (e) {
      throw new NotFoundException('Could not find movie.');
    }
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
