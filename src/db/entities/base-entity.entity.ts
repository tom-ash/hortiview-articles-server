import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity as TypeORMBaseEntity,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export abstract class BaseEntity extends TypeORMBaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Field()
  @Index()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
