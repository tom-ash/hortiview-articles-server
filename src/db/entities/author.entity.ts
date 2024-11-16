import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base-entity.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Article } from './article.entity';

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field((_type) => [Article])
  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
