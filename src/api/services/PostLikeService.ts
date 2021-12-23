import { PostLikeInput } from '../../db/models/PostLike'
import PostLikeRepository from '../../db/repository/PostLikeRepository'
import ErrorsEnum from '../utils/enums/ErrorsEnum'

export default class PostLikeService {
  public static async create(payload: PostLikeInput) {
    if (!payload.postId || !payload.userId) throw Error(ErrorsEnum.BAD_REQUEST)
    const likeAlreadyExists = await PostLikeRepository.getLikeByUserAndPost({
      postId: payload.postId,
      userId: payload.userId,
    })
    if (likeAlreadyExists) {
      return PostLikeRepository.delete({ id: Number(likeAlreadyExists.id) })
    }
    return PostLikeRepository.create(payload)
  }
}
