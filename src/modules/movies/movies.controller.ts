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
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IMovie } from './interfaces/movie.interface';
import {
  IDeleteRequestResponse,
  IQuery,
  Paginated,
} from '../../shared/interfaces';
import { routes } from '../../constants';
import { MovieDto } from './dto/movie.dto';
import { JwtAuthGuard } from '../auth/guards';

@Controller(routes.movies)
export class MoviesController {
  constructor(public readonly moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMovies(@Query() query?: IQuery): Promise<Paginated<IMovie[]>> {
    const movies = await this.moviesService.getMovies(query);
    return movies;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMovie(@Param('id') id: string): Promise<IMovie> {
    const movie = await this.moviesService.getMovie(id);
    return movie;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMovie(@Body() data: MovieDto, @Req() req: any): Promise<IMovie> {
    const newMovie = this.moviesService.createMovie(data, req.user);
    return newMovie;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateMovie(@Param('id') id: string, @Body() data: IMovie) {
    return this.moviesService.updateMovie(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<IDeleteRequestResponse> {
    const result = await this.moviesService.deleteMovie(id);
    return result;
  }
}
