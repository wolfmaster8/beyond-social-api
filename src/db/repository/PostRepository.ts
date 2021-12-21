import Post, { PostInput } from '../models/Post'

export default class PostRepository {
  public static async create(payload: PostInput) {
    return Post.create(payload)
  }
}
