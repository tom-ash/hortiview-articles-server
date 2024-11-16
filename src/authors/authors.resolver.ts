import { Resolver, Query } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(private authorsService: AuthorsService) {}

  @Query((returns) => [Author])
  authors(): Promise<Author[]> {
    return this.authorsService.findAll();
  }
}
