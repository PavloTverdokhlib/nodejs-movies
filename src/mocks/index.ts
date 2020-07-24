import { v4 as uuidv4 } from 'uuid';
import { Movie } from '../models/movie.model';

export const predefinedMovies: Movie[] = [
  {
    id: uuidv4(),
    title: 'Star Wars',
    description: 'Save the galaxy',
    release: new Date(),
    director: 'John Lucas',
    genre: 'Adventure',
  },
  {
    id: uuidv4(),
    title: 'Jurasic Park',
    description: 'Dinosour',
    release: new Date(),
    director: 'Bill Gate',
    genre: 'Action',
  },
  {
    id: uuidv4(),
    title: 'James Bond',
    description: 'Agent 007',
    release: new Date(),
    director: 'Shan Conory',
    genre: 'Documentary',
  },
  {
    id: uuidv4(),
    title: 'James Bond',
    description: 'Agent 007',
    release: new Date(),
    director: 'Shan Conory',
    genre: 'Documentary',
  },
  {
    id: uuidv4(),
    title: 'Lord of the Rings',
    description: 'Old but the Best film ever',
    release: new Date(),
    director: 'Peter Jackson',
    genre: 'Adventure',
  },
];
