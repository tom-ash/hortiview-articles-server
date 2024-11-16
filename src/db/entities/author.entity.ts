import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base-entity.entity';
import { Column, Entity, Index } from 'typeorm';

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;
}
