import { DataSource } from 'typeorm';
import { testDataSourceOptions } from '../data-source/data-source-options';

const TestDataSource = new DataSource(testDataSourceOptions);

(async () => await TestDataSource.initialize())();
