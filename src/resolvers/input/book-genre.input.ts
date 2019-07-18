import { Field, InputType } from 'type-graphql';

@InputType()
class BookGenreInput {
  @Field()
  readonly genreId: number;
  @Field()
  readonly bookId: number;
}

export default BookGenreInput;
