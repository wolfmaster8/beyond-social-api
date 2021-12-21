import Post, { PostInput, PostOutput } from '../models/Post'

export default class PostRepository {
  public static async create(payload: PostInput) {
    return Post.create(payload)
  }

  public static async getUserPosts({
    userId,
  }: {
    userId: number
  }): Promise<PostOutput[]> {
    return Post.findAll({ where: { userId }, order: [['createdAt', 'DESC']] })
  }
}
