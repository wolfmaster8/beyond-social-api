import Post, { PostInput, PostOutput } from '../models/Post'
import PostComment from '../models/PostComment'
import PostLike from '../models/PostLike'

export default class PostRepository {
  public static async create(payload: PostInput) {
    return Post.create(payload)
  }

  public static async findOne({ id }: { id: number }) {
    return Post.findOne({
      where: { id },
      include: [
        { model: PostComment, as: 'comments' },
        { model: PostLike, as: 'likes', attributes: ['id', 'userId'] },
      ],
    })
  }

  public static async getUserPosts({
    userId,
  }: {
    userId: number
  }): Promise<PostOutput[]> {
    return Post.findAll({ where: { userId }, order: [['createdAt', 'DESC']] })
  }
}
