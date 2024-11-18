import { Article } from 'src/db/entities/article.entity';
import { Author } from 'src/db/entities/author.entity';
import { Tag } from 'src/db/entities/tag.entity';
import { DataSourceOptions } from 'typeorm';

export const testDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434, // TODO: Move to .env
  username: 'hortiview_test', // TODO: Move to .env
  password: 'password_test', // TODO: Move to .env
  database: 'hortiview_local_test', // TODO: Move to .env
  entities: [Author, Article, Tag],
  dropSchema: true,
  synchronize: true,
};
