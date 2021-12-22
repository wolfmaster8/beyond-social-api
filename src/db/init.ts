import User from './models/User'
import Post from './models/Post'
import PostComment from './models/PostComment'
import PostLike from './models/PostLike'

require('dotenv').config({ path: '.env' })

const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
  await User.sync({ alter: isDev })
  await Post.sync({ alter: isDev })
  await PostComment.sync({ alter: isDev })
  await PostLike.sync({ alter: isDev })
}

export default dbInit
