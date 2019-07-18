import { genreBooksLoader } from '../db/loaders/books.loader';

export interface IGraphQLContext {
  genreBooksLoader: ReturnType<typeof genreBooksLoader>;
}
