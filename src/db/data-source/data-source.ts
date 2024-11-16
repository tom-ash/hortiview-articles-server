import { DataSource } from 'typeorm';
import { dataSourceOptions } from './data-source-options';

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
