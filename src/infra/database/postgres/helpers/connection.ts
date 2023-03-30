import { Sequelize, Options } from 'sequelize'
export const connect = (): Sequelize => {
  const dbUrl = process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE_URL
  if (dbUrl === undefined) throw new Error('DATABASE_URL environment variable is not defined')
  const defaultOptions: Options = {
    define: { underscored: true },
    logging: process.env.NODE_ENV !== 'test' ? console.log : false
  }
  const sequelize = new Sequelize(dbUrl, defaultOptions)
  return sequelize
}
