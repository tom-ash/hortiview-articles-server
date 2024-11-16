import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@InputType()
export class ArticleCreateInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field((_type) => Int)
  authorId: number;

  @Field()
  @IsDate()
  publishedOn: Date;
}
