import { Request, Response } from 'express'
import PostService from '../services/PostService'
import ErrorsEnum from '../utils/enums/ErrorsEnum'

export default class PostController {
  public static async create(req: Request, res: Response) {
    try {
      const post = await PostService.create(req.body)
      return res.status(201).json(post)
    } catch (e) {
      return res.status(500).json({ e })
    }
  }

  public static async findOne(req: Request, res: Response) {
    try {
      const postId = req.params.id
      const post = await PostService.findOne({ id: Number(postId) })
      return res.status(200).json(post)
    } catch (e: any) {
      console.log(e)
      if (e?.message) {
        if (e.message === ErrorsEnum.NOT_FOUND) {
          return res.status(404).json({
            message: 'No encontramos el post que buscas.',
          })
        }
      }
      return res.status(500).json({ e })
    }
  }

  public static async feed(req: Request, res: Response) {
    try {
      const posts = await PostService.feed()
      return res.status(200).json(posts)
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
      const postId = req.params.id
      const posts = await PostService.addCommentToPost({
        postId: Number(postId),
        content: req.body.content,
        userId: req.body.userId,
      })
      return res.status(201).json(posts)
    } catch (e) {
      return res.status(500).json({ e })
    }
  }

  public static async addLikeToPost(req: Request, res: Response) {
    try {
      const postId = req.params.id
      const posts = await PostService.addLikeToPost({
        postId: Number(postId),
        userId: req.body.userId,
      })
      return res.status(201).json(posts)
    } catch (e) {
      return res.status(500).json({ e })
    }
  }
}
