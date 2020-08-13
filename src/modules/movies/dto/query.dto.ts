import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Genre } from '../interfaces/movie.interface';

export class QueryDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  limit: string;

  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsEnum(Genre)
  genre: Genre;
}
