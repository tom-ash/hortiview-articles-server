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

describe('CreateAuthor', () => {
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
  });

  afterAll(async () => {
    await testingModule.close();
  });

  describe('when the GraphQL query is well-formed', () => {
    beforeAll(async () => {
      query = `
        mutation {
          createAuthor(authorCreateInput: {
            name: "John Doe"
          }) {
            name
          }
        }
      `;

      res = await request(app.getHttpServer()).post('/graphql').send({ query });
    });

    it('creates an author', async () => {
      expect(res.body).toEqual({
        data: {
          createAuthor: {
            name: 'John Doe',
          },
        },
      });
    });
  });

  describe('when the GraphQL query is malformed', () => {
    beforeAll(async () => {
      query = `
        mutation {
          createAuthor(authorCreateInput: {
            firstName: "John Doe"
          }) {
            name
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
              'Field "AuthorCreateInput.name" of required type "String!" was not provided.',
            locations: [
              {
                line: 3,
                column: 43,
              },
            ],
            extensions: {
              code: 'GRAPHQL_VALIDATION_FAILED',
            },
          },
          {
            message:
              'Field "firstName" is not defined by type "AuthorCreateInput".',
            locations: [
              {
                line: 4,
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
