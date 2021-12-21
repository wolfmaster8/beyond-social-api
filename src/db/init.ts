import User from './models/User'
import Post from './models/Post'

require('dotenv').config({ path: '.env' })

const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
  await User.sync({ alter: isDev })
  await Post.sync({ alter: isDev })
}
export default dbInit
