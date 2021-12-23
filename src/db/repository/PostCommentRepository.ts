import PostComment, { PostCommentInput } from '../models/PostComment'

export default class PostCommentRepository {
  public static async create(payload: PostCommentInput) {
    return PostComment.create(payload)
  }
}
