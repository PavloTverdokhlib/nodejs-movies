import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '../models/movie.model';

@Controller('movies')
export class MoviesController {
  constructor(public readonly moviesService: MoviesService) {}

  @Get()
  getMovies(@Query() query?: any): Movie[] {
    return this.moviesService.getMovies(query);
  }

  @Post()
  createMovie(@Body() data: Movie): Movie {
    return this.moviesService.createMovie(data);
  }
}
