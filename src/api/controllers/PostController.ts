import { Request, Response } from 'express'
import PostService from '../services/PostService'

export default class PostController {
  public static async create(req: Request, res: Response) {
    try {
      const post = await PostService.create(req.body)
      return res.status(201).json(post)
    } catch (e) {
      return res.status(500).json({ e })
    }
  }

  public static async getUserPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getUserPosts({ userId: req.body.userId })
      return res.status(200).json(posts)
    } catch (e) {
      return res.status(500).json({ e })
    }
  }

  public static async addCommentToPost(req: Request, res: Response) {
    try {
      const posts = await PostService.addCommentToPost(req.body)
      return res.status(201).json(posts)
    } catch (e) {
      return res.status(500).json({ e })
    }
  }

  public static async addLikeToPost(req: Request, res: Response) {
    try {
      const posts = await PostService.addLikeToPost(req.body)
      return res.status(201).json(posts)
    } catch (e) {
      return res.status(500).json({ e })
    }
  }
}
