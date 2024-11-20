import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsResolver } from 'src/app/modules/authors/authors.resolver';
import { AuthorsService } from 'src/app/modules/authors/authors.service';
import { Author } from 'src/db/entities/author.entity';
import { testDataSourceOptions } from 'test/db/data-source/data-source-options';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import * as request from 'supertest';

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
        TypeOrmModule.forFeature([Author]),
      ],
      providers: [AuthorsResolver, AuthorsService],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    await Author.create({
      name: 'Test Author #1',
    }).save();

    await Author.create({
      name: 'Test Author #2',
    }).save();
  });

  afterAll(async () => {
    await testingModule.close();
  });

  describe('when the GraphQL query is well-formed', () => {
    beforeAll(async () => {
      query = `
        {
          authors {
            id,
            name,
          }
        }
      `;

      res = await request(app.getHttpServer()).post('/graphql').send({ query });
    });

    it('gets all authors', async () => {
      expect(res.body).toEqual({
        data: {
          authors: [
            {
              id: expect.any(String),
              name: 'Test Author #1',
            },
            {
              id: expect.any(String),
              name: 'Test Author #2',
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
          authors {
            id,
            firstName,
          }
        }
      `;

      res = await request(app.getHttpServer()).post('/graphql').send({ query });
    });

    it('responds with GraphQL validation error', async () => {
      expect(res.body).toEqual({
        errors: [
          {
            message: 'Cannot query field "firstName" on type "Author".',
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
