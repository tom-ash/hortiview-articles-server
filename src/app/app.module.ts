import { Module } from '@nestjs/common';
import { AuthorsModule } from './modules/authors/authors.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/db/data-source/data-source-options';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.qql'),
      driver: ApolloDriver,
    }),
    AuthorsModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
