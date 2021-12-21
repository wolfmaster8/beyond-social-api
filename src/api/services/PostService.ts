import { PostInput, PostOutput } from '../../db/models/Post'
import PostRepository from '../../db/repository/PostRepository'

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
}
