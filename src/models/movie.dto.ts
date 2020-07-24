import { IsNotEmpty, IsDateString, Contains } from 'class-validator';
import { Genre } from './movie.model';

export class MovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  release: Date;

  @IsNotEmpty()
  director: string;

  @IsNotEmpty()
  @Contains('Action')
  genre: Genre;
}
