import User from './models/User'

require('dotenv').config({ path: '.env' })

const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
  await User.sync({ alter: isDev, logging: true })
}
export default dbInit
