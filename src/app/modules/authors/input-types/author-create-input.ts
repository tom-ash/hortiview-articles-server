import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthorCreateInput {
  @Field()
  name: string;
}
