import { Sequelize } from "sequelize";
require('dotenv').config()

export const sequelize = new Sequelize({
    dialect:'postgres',
    host: 'localhost',
    port: 5432,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    define:{
        underscored:true
    }
})