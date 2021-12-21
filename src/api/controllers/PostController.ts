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
}
