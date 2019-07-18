import { Field, InputType } from 'type-graphql';

@InputType()
class AuthorInput {
  @Field()
  readonly name: string;
}

export default AuthorInput;
