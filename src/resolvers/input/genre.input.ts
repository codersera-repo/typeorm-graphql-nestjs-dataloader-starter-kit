import { Field, InputType } from 'type-graphql';

@InputType()
class GenreInput {
  @Field()
  readonly name: string;
}

export default GenreInput;
