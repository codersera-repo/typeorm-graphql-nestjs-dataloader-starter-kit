import { Field, InputType } from 'type-graphql';
import AuthorInput from './author.input';

@InputType()
class BookAuthorConnectInput {
  @Field()
  readonly id: number;
}

@InputType()
class BookAuthorInput {
  @Field({nullable: true})
  readonly connect: BookAuthorConnectInput;

  @Field({nullable: true})
  readonly create: AuthorInput;
}

@InputType()
class BookInput {
  @Field()
  readonly title: string;

  @Field()
  readonly author: BookAuthorInput;
}

export default BookInput;
