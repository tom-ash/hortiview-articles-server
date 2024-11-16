import { DataSourceOptions } from 'typeorm';
import { Author } from '../entities/author.entity';
import { Article } from '../entities/article.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433, // TODO: Move to .env
  username: 'hortiview', // TODO: Move to .env
  password: 'password', // TODO: Move to .env
  database: 'hortiview_local', // TODO: Move to .env
  entities: [Author, Article],
  migrations: [`${__dirname}/../migrations/*.ts`],
  synchronize: false,
};
