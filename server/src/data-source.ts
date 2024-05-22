import 'dotenv/config';
import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { Task } from './entities/Task';
import { User } from './entities/User';

const port = process.env.DATABASE_PORT as number | undefined;

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: port,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [User, Task],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
};

export const AppDataSource: Promise<Connection> = createConnection(connectionOptions);

export { connectionOptions };
