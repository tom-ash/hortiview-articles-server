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

  create(input: AuthorCreateInput): Promise<Author> {
    const author = this.authorsRepository.create(input);

    return this.authorsRepository.save(author);
  }
}
