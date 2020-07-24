export type Genre = 'Action' | 'Adventure' | 'Documentary';

export class Movie {
  public id: string;
  public title: string;
  public description: string;
  public release: Date;
  public director: string;
  public genre: Genre;

  constructor(args) {
    for (const key in args) {
      if (args.hasOwnProperty(key)) {
        this[key] = args[key];
      }
    }
  }
}
