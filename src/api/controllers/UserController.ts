import { Request, Response } from 'express'
import { UserInput } from '../../db/models/User'
import UserService from '../services/UserService'
import ErrorsEnum from '../utils/enums/ErrorsEnum'

export default class UserController {
  public static async create(req: Request, res: Response) {
    try {
      const payload: UserInput = req.body
      const user = await UserService.create(payload)
      return res.status(201).json(user)
    } catch (e: any) {
      if (e?.message) {
        if (e.message === ErrorsEnum.BAD_REQUEST) {
          return res.status(400).json({
            message: 'Revisa los campos e intenta de nuevo.',
          })
        }
        if (e.message === ErrorsEnum.EMAIL_ALREADY_REGISTERED) {
          return res.status(400).json({
            message: 'Este email ya está registrado.',
          })
        }
        if (e.message === ErrorsEnum.USERNAME_ALREADY_REGISTERED) {
          return res.status(400).json({
            message: 'Este username ya está registrado.',
          })
        }
      }
      return res.status(500).json({ e })
    }
  }

  public static async profile(req: Request, res: Response) {
    try {
      const { userId } = req.body
      const user = await UserService.getUserProfile({ id: userId })
      return res.status(200).json(user)
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Ocurrió un error al recuperar tu perfil' })
    }
  }

  public static async getUserWithPosts(req: Request, res: Response) {
    try {
      const { userId } = req.body
      const user = await UserService.getUserWithPosts({ id: userId })
      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Ocurrió un error al recuperar tu perfil' })
    }
  }
}
