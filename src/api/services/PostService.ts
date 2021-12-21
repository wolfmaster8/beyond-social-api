import { PostInput, PostOutput } from '../../db/models/Post'
import PostRepository from '../../db/repository/PostRepository'
import { PostLikeInput } from '../../db/models/PostLike'
import PostCommentRepository from '../../db/repository/PostCommentRepository'
import { PostCommentInput } from '../../db/models/PostComment'
import PostLikeService from './PostLikeService'

export default class PostService {
  public static async create(payload: PostInput) {
    return PostRepository.create(payload)
  }

  public static async getUserPosts({
    userId,
  }: {
    userId: number
  }): Promise<PostOutput[]> {
    return PostRepository.getUserPosts({ userId })
  }

  public static async addCommentToPost(payload: PostCommentInput) {
    return PostCommentRepository.create(payload)
  }

  public static async addLikeToPost(payload: PostLikeInput) {
    return PostLikeService.create(payload)
  }
}
