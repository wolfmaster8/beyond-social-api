import PostComment, { PostCommentInput } from '../models/PostComment'

export default class PostCommentRepository {
  public static async create(payload: PostCommentInput) {
    console.log(payload)
    return PostComment.create(payload)
  }
}
