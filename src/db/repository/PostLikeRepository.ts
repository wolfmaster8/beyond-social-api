import PostLike, { PostLikeInput } from '../models/PostLike'

export default class PostLikeRepository {
  public static async create(payload: PostLikeInput) {
    return PostLike.create(payload)
  }

  public static async delete({ id }: { id: number }) {
    return PostLike.destroy({ where: { id } })
  }

  public static async getLikeByUserAndPost({
    userId,
    postId,
  }: Pick<PostLikeInput, 'postId' | 'userId'>): Promise<PostLikeInput | null> {
    return PostLike.findOne({ where: { userId, postId } })
  }
}
