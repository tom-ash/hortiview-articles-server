import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from '../../../db/entities/author.entity';
import { AuthorCreateInput } from './input-types/author-create-input';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(private authorsService: AuthorsService) {}

  @Query((_returns) => [Author])
  authors(): Promise<Author[]> {
    return this.authorsService.find();
  }

  @Mutation((_returns) => Author)
  createAuthor(
    @Args('authorCreateInput') input: AuthorCreateInput,
  ): Promise<Author> {
    return this.authorsService.create(input);
  }
}
