import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import RepoService from '../repo.service';
import Author from '../db/models/author.entity';
import Book from '../db/models/book.entity';
import BookInput from './input/book.input';

@Resolver(Book)
class BookResolver {

  constructor(private readonly repoService: RepoService) {}
  @Query(() => [Book])
  public async books(): Promise<Book[]> {
    return this.repoService.bookRepo.find();
  }
  @Query(() => Book, {nullable: true})
  public async book(@Args('id') id: number): Promise<Book> {
    return this.repoService.bookRepo.findOne({where: {id}});
  }

  @Mutation(() => Book)
  public async createBook(@Args('data') input: BookInput): Promise<Book> {
    const book = new Book();
    book.title = input.title;
    if (input.author.connect) {
      book.authorId = input.author.connect.id;
    } else {
      if (!input.author.create) {
        throw new Error('Either pass a valid author id for the book or provide a new author using the create input option');
      }
      const authorToSave = this.repoService.authorRepo.create({name: input.author.create.name});
      const savedAuthor = await this.repoService.authorRepo.save(authorToSave);
      book.authorId = savedAuthor.id;
    }
    return this.repoService.bookRepo.save(book);
  }

  @ResolveProperty()
  public async author(@Parent() parent): Promise<Author> {
    return this.repoService.authorRepo.findOne(parent.authorId);
  }
}

export default BookResolver;
