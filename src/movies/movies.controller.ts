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
import { Movie } from '../models/movie.model';
import {
  IDeleteRequestResponse,
  IQuery,
  Paginated,
} from '../shared/interfaces';
import { routes } from '../constants/routes';

@Controller(routes.movies)
export class MoviesController {
  constructor(public readonly moviesService: MoviesService) {}

  @Get()
  getMovies(@Query() query?: IQuery): Paginated<Movie[]> {
    return this.moviesService.getMovies(query);
  }

  @Get(':id')
  getMovie(@Param('id') id: string): Movie {
    return this.moviesService.getMovie(id);
  }

  @Post()
  createMovie(@Body() data: Movie): Movie {
    return this.moviesService.createMovie(data);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: Movie) {
    return this.moviesService.updateMovie(id, data);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string): IDeleteRequestResponse {
    return this.moviesService.deleteMovie(id);
  }
}
