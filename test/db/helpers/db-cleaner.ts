import { Article } from 'src/db/entities/article.entity';
import { Author } from 'src/db/entities/author.entity';
import { Tag } from 'src/db/entities/tag.entity';
import { BaseEntity } from 'typeorm';

export async function DBCleaner(entities?: (typeof BaseEntity)[]) {
  const entitiesToClean = entities || [Author, Article, Tag];

  for (let i = 0; i < entitiesToClean.length; i++) {
    await entitiesToClean[i].delete({});
  }
}
