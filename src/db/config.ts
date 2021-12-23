import { Dialect, Sequelize } from 'sequelize'

require('dotenv').config({ path: '.env' })

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPort = process.env.DB_PORT
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: Number(dbPort),
  dialect: dbDriver,
  dialectOptions: {
    charset: 'utf8mb4',
  },
})

export default sequelizeConnection
