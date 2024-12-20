import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { Author } from '../../../db/entities/author.entity';
import { ArticlesService } from './articles.service';
import { ArticleCreateInput } from './input-types/article-create-input';
import { Article } from 'src/db/entities/article.entity';
import { AuthorsService } from '../authors/authors.service';
import { Tag } from 'src/db/entities/tag.entity';

@Resolver((_of) => Article)
export class ArticlesResolver {
  constructor(
    private articlesService: ArticlesService,
    private authorsService: AuthorsService,
  ) {}
  @Query((_returns) => [Article])
  articles(): Promise<Article[]> {
    return this.articlesService.find();
  }

  @Query((_returns) => Article)
  article(@Args('id', { type: () => ID }) id: number): Promise<Article> {
    return this.articlesService.findOne(Number(id));
  }

  @ResolveField((_returns) => Author)
  author(@Parent() article: Article): Promise<Author> {
    return this.authorsService.findOne(article.authorId);
  }

  @ResolveField((_returns) => [Tag])
  tags(@Parent() article: Article): Tag[] {
    return article.tags;
  }

  @Mutation((_returns) => Article)
  createArticle(
    @Args('articleCreateInput') input: ArticleCreateInput,
  ): Promise<Article> {
    return this.articlesService.create(input);
  }
}
