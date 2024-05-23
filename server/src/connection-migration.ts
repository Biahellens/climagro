import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const port = process.env.DATABASE_PORT
  ? parseInt(process.env.DATABASE_PORT, 10)
  : 5432

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: port,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,

  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  synchronize: false,
  logging: true,
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
