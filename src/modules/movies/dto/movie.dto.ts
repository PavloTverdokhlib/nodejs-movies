import { IsNotEmpty, IsDefined, IsOptional, IsDateString, IsEnum, IsString } from 'class-validator';
import { Genre } from '../interfaces/movie.interface';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  release: Date;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsEnum(Genre)
  genre: Genre;
}

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  release: Date;

  @IsOptional()
  @IsString()
  director: string;

  @IsOptional()
  @IsEnum(Genre)
  genre: Genre;
}
