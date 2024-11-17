import dataSource from '../data-source/data-source';
import { Article } from '../entities/article.entity';
import { Author } from '../entities/author.entity';
import { Tag } from '../entities/tag.entity';

import * as articles from '../fixtures/articles.json';

(async () => {
  try {
    await dataSource.initialize();

    // Added one by one to ensure idempotency.
    for (let i = 0; i < articles.length; i++) {
      const articleData = articles[i];

      const {
        ArticleID: externalId,
        Title: title,
        ShortDescription: description,
        FullContent: content,
        PublishedDate: publishedOn,
        Author: authorName,
        Tags: tags,
      } = articleData;

      await Author.upsert(
        {
          name: authorName,
        },
        {
          conflictPaths: ['name'],
        },
      );

      const author = await Author.findOneByOrFail({ name: authorName });

      await Article.upsert(
        {
          author,
          externalId,
          title,
          description,
          content,
          publishedOn,
        },
        {
          conflictPaths: ['externalId'],
        },
      );

      const article = await Article.findOneOrFail({
        where: { externalId },
        relations: ['tags'],
      });

      for (let j = 0; j < tags.length; j++) {
        const tagName = tags[j];

        await Tag.upsert(
          {
            value: tagName,
          },
          {
            conflictPaths: ['value'],
          },
        );

        const tag = await Tag.findOneByOrFail({ value: tagName });

        const tagExists = article.tags.some(
          (existingTag) => existingTag.value === tag.value,
        );

        if (!tagExists) {
          article.tags.push(tag);

          await article.save();
        }
      }
    }

    await dataSource.destroy();
  } catch (error) {
    console.error(error);
  }
})();
