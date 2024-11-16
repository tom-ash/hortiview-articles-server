import { Injectable } from '@nestjs/common';
import { Author } from './author.entity';

@Injectable()
export class AuthorsService {
  async findAll(): Promise<Author[]> {
    // Temporary mocked DB implementation.
    const author = new Author();
    author.id = 1;
    author.name = 'John Doe';

    return [author];
  }
}
