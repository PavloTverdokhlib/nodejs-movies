import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Paginated } from '../../shared/interfaces';
import { Genre, IMovie } from './interfaces/movie.interface';
import { MovieDto, UpdateMovieDto } from './dto/movie.dto';
import { IUser } from '../users/interfaces/user.interface';
import { toMovie } from '../../shared/transform';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<IMovie>,
  ) {}

  public async getMovies(query: QueryDto): Promise<Paginated<IMovie[]>> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 1;
    const start = (page - 1) * limit;
    const end = start + limit;
    const filters = this.getFiltersQuery(query);
    const movies = await this.movieModel
      .find({
        $and: filters,
      })
      .exec();
    const isNextEmpty = end >= movies.length;
    const next = isNextEmpty ? null : `/movies?${this.buildNextPageUrl(query)}`;
    return {
      page,
      limit,
      total: movies.length,
      next,
      value: movies
        .slice(start, end)
        .map(m => m.toObject({ transform: toMovie })),
    };
  }

  public async getMovie(id: string): Promise<IMovie> {
    const movie = await this.findMovie(id);
    return movie.toObject({ transform: toMovie });
  }

  public async createMovie(data: MovieDto, user: IUser): Promise<IMovie> {
    const newMovie = new this.movieModel({
      ...data,
      createdBy: user.username,
      createdAt: new Date(),
    });
    const savedMovie = await newMovie.save();
    return savedMovie.toObject({ transform: toMovie });
  }

  public async updateMovie(id: string, data: UpdateMovieDto): Promise<IMovie> {
    const movie = await this.findMovie(id);
    const result = await this.movieModel
      .updateOne({ _id: movie.id }, { ...data }, { runValidators: true })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find movie.');
    }
    return await this.findMovie(id);
  }

  public async deleteMovie(id: string): Promise<HttpStatus> {
    const result = await this.movieModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find movie.');
    }
    return HttpStatus.NO_CONTENT;
  }

  public getGenreList(): string[] {
    return Object.keys(Genre).map(key => Genre[key]);
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

  private getFiltersQuery = (query: QueryDto): any[] => {
    const filters: any = [
      {
        $or: [
          { title: { $regex: query.search || '', $options: '$i' } },
          { description: { $regex: query.search || '', $options: '$i' } },
        ],
      },
    ];
    if (query.genre) {
      filters.push({
        genre: { $eq: query.genre },
      });
    }
    return filters;
  };

  private buildNextPageUrl = (query: QueryDto): string => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 1;
    const filters = [];
    filters.push(`page=${page + 1}`);
    filters.push(`limit=${limit}`);
    if (query.search) {
      filters.push(`search=${query.search}`);
    }
    if (query.genre) {
      filters.push(`genre=${query.genre}`);
    }
    return filters.join('&');
  };

  private checkProp<T>(obj: any, key: string): T {
    if (obj.hasOwnProperty(key)) {
      return obj[key];
    }
    return undefined;
  }
}
