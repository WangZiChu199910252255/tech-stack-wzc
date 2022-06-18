/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import UserEntity from '../entity/user.entity';
const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'sqlite',
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});
export default AppDataSource
