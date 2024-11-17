import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base-entity.entity';
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { Article } from './article.entity';

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field()
  @Column({
    length: 256,
  })
  @Index({ unique: true })
  value: string;

  @ManyToMany(() => Article, (article) => article.tags)
  @JoinTable({
    name: 'articles_tags',
    joinColumn: {
      name: 'tag_id', // Custom column name for the user side
      referencedColumnName: 'id', // Referencing the primary key of the User entity
    },
    inverseJoinColumn: {
      name: 'article_id', // Custom column name for the role side
      referencedColumnName: 'id', // Referencing the primary key of the Role entity
    },
  })
  @Field(() => [Article], { nullable: true })
  articles: Article[];
}
