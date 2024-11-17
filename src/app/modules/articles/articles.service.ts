import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCreateInput } from './input-types/article-create-input';
import { Article } from 'src/db/entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async find(): Promise<Article[]> {
    return this.articleRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: number): Promise<Article> {
    try {
      return this.articleRepository.findOneOrFail({
        where: { id },
        relations: ['tags'],
      });
    } catch (error) {
      throw new Error(`Article id ${id} not found.`);
    }
  }

  create(input: ArticleCreateInput): Promise<Article> {
    const author = this.articleRepository.create(input);
    return this.articleRepository.save(author);
  }
}
