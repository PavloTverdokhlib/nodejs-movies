export type Genre = 'Action' | 'Adventure' | 'Documentary';

export class Movie {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public release: Date,
    public director: string,
    public genre: Genre,
  ) {}
}
