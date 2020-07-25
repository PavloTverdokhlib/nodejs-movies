import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IMovie } from '../models/movie.model';
import {
  IDeleteRequestResponse,
  IQuery,
  Paginated,
} from '../shared/interfaces';
import { routes } from '../constants/routes';
import { MovieDto } from '../models/movie.dto';

@Controller(routes.movies)
export class MoviesController {
  constructor(public readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(@Query() query?: IQuery): Promise<Paginated<IMovie[]>> {
    const movies = await this.moviesService.getMovies(query);
    return movies;
  }

  @Get(':id')
  async getMovie(@Param('id') id: string): Promise<IMovie> {
    const movie = await this.moviesService.getMovie(id);
    return movie
  }

  @Post()
  async createMovie(@Body() data: MovieDto): Promise<IMovie> {
    const newMovie = this.moviesService.createMovie(data);
    return newMovie;
  }

  @Patch(':id')
  updateMovie(@Param('id') id: string, @Body() data: IMovie) {
    return this.moviesService.updateMovie(id, data);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<IDeleteRequestResponse> {
    const result = await this.moviesService.deleteMovie(id);
    return result;
  }
}
