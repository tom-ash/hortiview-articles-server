import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from 'src/app/modules/authors/authors.service';
import { Author } from 'src/db/entities/author.entity';
import { testDataSourceOptions } from 'test/db/data-source/data-source-options';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import * as request from 'supertest';
import { Article } from 'src/db/entities/article.entity';
import { ArticlesResolver } from 'src/app/modules/articles/articles.resolver';
import { ArticlesService } from 'src/app/modules/articles/articles.service';
import { Tag } from 'src/db/entities/tag.entity';

const tags = ['Crop Yield', 'Soil Health', 'Irrigation'];

describe('GetAuthors', () => {
  let testingModule: TestingModule;
  let app: INestApplication;
  let query: string;
  let res: request.Response;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          autoSchemaFile: join(process.cwd(), 'test/schema.qql'),
          driver: ApolloDriver,
        }),
        TypeOrmModule.forRoot(testDataSourceOptions),
        TypeOrmModule.forFeature([Article, Author]),
      ],
      providers: [ArticlesResolver, ArticlesService, AuthorsService],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    const author = await Author.create({
      name: 'John Smith',
    }).save();

    await Article.create({
      author,
      title: 'How Drones Are Revolutionizing Crop Monitoring',
      description:
        'An in-depth look at the role of drones in monitoring and boosting crop productivity.',
      content:
        'This article dives deep into the specified topic, offering an analysis of current practices, scientific advancements, and their implications for global agriculture. It explores how farmers, researchers, and policymakers are addressing critical issues related to food security, environmental challenges, and market trends. Through real-world examples and expert insights, the article underscores actionable steps for stakeholders in the agricultural sector. Additionally, it emphasizes the interconnectedness of modern farming practices with broader socio-economic and environmental factors. This article specifically focuses on how drones are revolutionizing crop monitoring and provides unique perspectives, case studies, and forecasts to offer a comprehensive understanding. The information presented is particularly relevant to stakeholders addressing the challenges and opportunities in agriculture in 2024 and beyond.',
      publishedOn: '2024-01-02',
    }).save();

    const article = await Article.findOneOrFail({
      where: { title: 'How Drones Are Revolutionizing Crop Monitoring' },
      relations: ['tags'],
    });

    for (let i = 0; i < tags.length; i++) {
      const tagName = tags[i];

      await Tag.upsert(
        {
          value: tagName,
        },
        {
          conflictPaths: ['value'],
        },
      );

      const tag = await Tag.findOneByOrFail({ value: tagName });

      article.tags.push(tag);

      await article.save();
    }
  });

  afterAll(async () => {
    await testingModule.close();
  });

  describe('when the GraphQL query is well-formed', () => {
    beforeAll(async () => {
      query = `
        {
          articles {
            id
            title
            description
            content
            publishedOn
            tags {
              value
            }
            author {
              name
            }
          }
        }
      `;

      res = await request(app.getHttpServer()).post('/graphql').send({ query });
    });

    it('gets all authors', async () => {
      expect(res.body).toEqual({
        data: {
          articles: [
            {
              id: expect.any(String),
              title: 'How Drones Are Revolutionizing Crop Monitoring',
              description:
                'An in-depth look at the role of drones in monitoring and boosting crop productivity.',
              content:
                'This article dives deep into the specified topic, offering an analysis of current practices, scientific advancements, and their implications for global agriculture. It explores how farmers, researchers, and policymakers are addressing critical issues related to food security, environmental challenges, and market trends. Through real-world examples and expert insights, the article underscores actionable steps for stakeholders in the agricultural sector. Additionally, it emphasizes the interconnectedness of modern farming practices with broader socio-economic and environmental factors. This article specifically focuses on how drones are revolutionizing crop monitoring and provides unique perspectives, case studies, and forecasts to offer a comprehensive understanding. The information presented is particularly relevant to stakeholders addressing the challenges and opportunities in agriculture in 2024 and beyond.',
              publishedOn: '2024-01-02',
              author: {
                name: 'John Smith',
              },
              tags: [
                {
                  value: 'Crop Yield',
                },
                {
                  value: 'Soil Health',
                },
                {
                  value: 'Irrigation',
                },
              ],
            },
          ],
        },
      });
    });
  });

  describe('when the GraphQL query is malformed', () => {
    beforeAll(async () => {
      query = `
        {
          articles {
            id
            name
            title
            description
            content
            publishedOn
            tags {
              value
            }
            author {
              name
            }
          }
        }
      `;

      res = await request(app.getHttpServer()).post('/graphql').send({ query });
    });

    it('responds with GraphQL validation error', async () => {
      expect(res.body).toEqual({
        errors: [
          {
            message: 'Cannot query field "name" on type "Article".',
            locations: [
              {
                line: 5,
                column: 13,
              },
            ],
            extensions: {
              code: 'GRAPHQL_VALIDATION_FAILED',
            },
          },
        ],
      });
    });
  });
});
