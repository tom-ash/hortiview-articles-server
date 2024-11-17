import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base-entity.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { IsDate } from 'class-validator';
import { Author } from './author.entity';
import { Tag } from './tag.entity';

@ObjectType()
@Entity()
export class Article extends BaseEntity {
  @Field()
  @Column({
    length: 256,
  })
  @Index()
  title: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  externalId?: number;

  @Field()
  @Column({
    length: 512,
  })
  description: string;

  @Field()
  @Column({
    length: 16384,
  })
  content: string;

  @Field((_type) => String!)
  @Column({
    type: 'date',
    name: 'published_on',
  })
  @Index()
  @IsDate()
  publishedOn: Date;

  @Column({
    name: 'author_id',
  })
  authorId: number;

  @Field((_type) => Author)
  @ManyToOne(() => Author, (author) => author.articles)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToMany(() => Tag, (tag) => tag.articles)
  @Field(() => [Tag], { nullable: true })
  tags: Tag[];
}
