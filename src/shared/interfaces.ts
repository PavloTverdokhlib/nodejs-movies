export interface IQuery {
  search?: string;
  limit?: string;
  page?: string;
}

export enum Status {
  DELETED = 'Deleted',
}

export interface IDeleteRequestResponse {
  status: string;
}

export interface Paginated<T> {
  page: number;
  limit: number;
  total: number;
  value: T;
}
