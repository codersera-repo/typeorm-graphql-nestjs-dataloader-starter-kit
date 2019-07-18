import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import RepoService from '../repo.service';
import Author from '../db/models/author.entity';
import Book from '../db/models/book.entity';
import BookInput from './input/book.input';
import Genre from '../db/models/genre.entity';
import GenreInput from './input/genre.input';
import BookGenre from '../db/models/book-genre.entity';
import BookGenreInput from './input/book-genre.input';
import { Arg } from 'type-graphql';

@Resolver()
class BookGenreResolver {

  constructor(private readonly repoService: RepoService) {}
  @Mutation(() => BookGenre)
  public async createBookGenre(@Args('data') input: BookGenreInput): Promise<BookGenre> {
    const bookGenre = new BookGenre();
    const {bookId, genreId} = input;
    bookGenre.bookId = bookId;
    bookGenre.genreId = genreId;
    return this.repoService.bookGenreRepo.save(bookGenre);
  }

  @Query(() => [BookGenre])
  public async bookGenres(): Promise<BookGenre[]> {
    return this.repoService.bookGenreRepo.find();
  }

  @Query(() => BookGenre)
  public async bookGenre(@Arg('id') id: number): Promise<BookGenre> {
    return this.repoService.bookGenreRepo.findOne(id);
  }
}

export default BookGenreResolver;
