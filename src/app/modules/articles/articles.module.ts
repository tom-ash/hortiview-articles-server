import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/db/entities/article.entity';
import { Author } from 'src/db/entities/author.entity';
import { AuthorsService } from '../authors/authors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Author])],
  providers: [ArticlesService, AuthorsService, ArticlesResolver],
})
export class ArticlesModule {}
