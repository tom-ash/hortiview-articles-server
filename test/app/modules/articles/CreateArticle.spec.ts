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

describe('CreateAuthor', () => {
  let testingModule: TestingModule;
  let app: INestApplication;
  let query: string;
  let res: request.Response;
  let author: Author;

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

    author = await Author.create({
      name: 'John Smith',
    }).save();
  });

  afterAll(async () => {
    await testingModule.close();
  });

  describe('when the GraphQL query is well-formed', () => {
    beforeAll(async () => {
      query = `
        mutation {
          createArticle(articleCreateInput: {
            authorId: ${author.id},
            title: "How Drones Are Revolutionizing Crop Monitoring",
            description:
              "An in-depth look at the role of drones in monitoring and boosting crop productivity.",
            content:
              "This article dives deep into the specified topic, offering an analysis of current practices, scientific advancements, and their implications for global agriculture. It explores how farmers, researchers, and policymakers are addressing critical issues related to food security, environmental challenges, and market trends. Through real-world examples and expert insights, the article underscores actionable steps for stakeholders in the agricultural sector. Additionally, it emphasizes the interconnectedness of modern farming practices with broader socio-economic and environmental factors. This article specifically focuses on how drones are revolutionizing crop monitoring and provides unique perspectives, case studies, and forecasts to offer a comprehensive understanding. The information presented is particularly relevant to stakeholders addressing the challenges and opportunities in agriculture in 2024 and beyond.",
            publishedOn: "2024-01-02",
          }) {
            title
          }
        }
      `;

      res = await request(app.getHttpServer()).post('/graphql').send({ query });
    });

    it('creates an article', async () => {
      expect(res.body).toEqual({
        data: {
          createArticle: {
            title: 'How Drones Are Revolutionizing Crop Monitoring',
          },
        },
      });
    });
  });

  describe('when the GraphQL query is malformed', () => {
    beforeAll(async () => {
      query = `
        mutation {
          createArticle(articleCreateInput: {
            title: "How Drones Are Revolutionizing Crop Monitoring",
            description:
              "An in-depth look at the role of drones in monitoring and boosting crop productivity.",
            content:
              "This article dives deep into the specified topic, offering an analysis of current practices, scientific advancements, and their implications for global agriculture. It explores how farmers, researchers, and policymakers are addressing critical issues related to food security, environmental challenges, and market trends. Through real-world examples and expert insights, the article underscores actionable steps for stakeholders in the agricultural sector. Additionally, it emphasizes the interconnectedness of modern farming practices with broader socio-economic and environmental factors. This article specifically focuses on how drones are revolutionizing crop monitoring and provides unique perspectives, case studies, and forecasts to offer a comprehensive understanding. The information presented is particularly relevant to stakeholders addressing the challenges and opportunities in agriculture in 2024 and beyond.",
            publishedOn: "2024-01-02",
          }) {
            title
          }
        }
      `;

      res = await request(app.getHttpServer()).post('/graphql').send({ query });
    });

    it('responds with GraphQL validation errors', async () => {
      expect(res.body).toEqual({
        errors: [
          {
            message:
              'Field "ArticleCreateInput.authorId" of required type "Int!" was not provided.',
            locations: [
              {
                line: 3,
                column: 45,
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
