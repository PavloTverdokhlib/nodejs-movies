import {
  Controller,
  Req,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IMovie } from './interfaces/movie.interface';
import { Paginated } from '../../shared/interfaces';
import { routes } from '../../constants';
import { MovieDto } from './dto/movie.dto';
import { QueryDto } from './dto/query.dto';
import { JwtAuthGuard } from '../auth/guards';

@UseGuards(JwtAuthGuard)
@Controller(routes.movies)
export class MoviesController {
  constructor(public readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(@Query() query?: QueryDto): Promise<Paginated<IMovie[]>> {
    return this.moviesService.getMovies(query);
  }

  @Get('genre-list')
  async getGenres(): Promise<string[]> {
    return this.moviesService.getGenreList();
  }

  @Get(':id')
  async getMovie(@Param('id') id: string): Promise<IMovie> {
    return this.moviesService.getMovie(id);
  }

  @Post()
  async createMovie(@Body() data: MovieDto, @Req() req: any): Promise<IMovie> {
    return this.moviesService.createMovie(data, req.user);
  }

  @Patch(':id')
  updateMovie(@Param('id') id: string, @Body() data: IMovie) {
    return this.moviesService.updateMovie(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMovie(@Param('id') id: string): Promise<HttpStatus> {
    return this.moviesService.deleteMovie(id);
  }
}
