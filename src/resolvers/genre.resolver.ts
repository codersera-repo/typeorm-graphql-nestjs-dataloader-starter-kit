import { Args, Context, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import RepoService from '../repo.service';
import Author from '../db/models/author.entity';
import Book from '../db/models/book.entity';
import BookInput from './input/book.input';
import Genre from '../db/models/genre.entity';
import GenreInput from './input/genre.input';
import BookGenre from '../db/models/book-genre.entity';
import { IGraphQLContext } from '../types/graphql.types';

@Resolver(Genre)
class GenreResolver {

  constructor(private readonly repoService: RepoService) {}
  @Query(() => [Genre])
  public async genres(): Promise<Genre[]> {
    return this.repoService.genreRepo.find();
  }
  @Query(() => Genre, {nullable: true})
  public async genre(@Args('id') id: number): Promise<Genre> {
    return this.repoService.genreRepo.findOne(id);
  }

  @Mutation(() => Genre)
  public async createGenre(@Args('data') input: GenreInput): Promise<Genre> {
    const genre = new Genre();
    genre.name = input.name;
    return this.repoService.genreRepo.save(genre);
  }

  @ResolveProperty()
  public async book(@Parent() parent, @Context() {genreBooksLoader}: IGraphQLContext): Promise<Book[]> {
    return genreBooksLoader.load(parent.id);
  }
}

export default GenreResolver;
