import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import Author from './db/models/author.entity';
import Book from './db/models/book.entity';
import Genre from './db/models/genre.entity';
import BookGenre from './db/models/book-genre.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Book,
      Genre,
      BookGenre,
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {

}
export default RepoModule;
