import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Author from './db/models/author.entity';
import Book from './db/models/book.entity';
import Genre from './db/models/genre.entity';
import BookGenre from './db/models/book-genre.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Author) public readonly authorRepo: Repository<Author>,
    @InjectRepository(Book) public readonly bookRepo: Repository<Book>,
    @InjectRepository(Genre) public readonly genreRepo: Repository<Genre>,
    @InjectRepository(BookGenre) public readonly bookGenreRepo: Repository<BookGenre>,
  ) {}
}

export default RepoService;
