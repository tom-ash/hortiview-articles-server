import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class AuthorCreateInput {
  @Field()
  @IsAlpha()
  name: string;
}
