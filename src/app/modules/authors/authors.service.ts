import { Injectable } from '@nestjs/common';
import { Author } from '../../../db/entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorCreateInput } from './input-types/author-create-input';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  async find(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    try {
      return this.authorsRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new Error(`Author id ${id} not found.`);
    }
  }

  create(input: AuthorCreateInput): Promise<Author> {
    const author = this.authorsRepository.create(input);

    return this.authorsRepository.save(author);
  }
}
