import { Request, Response } from 'express'
import { UserInput } from '../../db/models/User'
import UserService from '../services/UserService'

export default class UserController {
  public static async create(req: Request, res: Response) {
    try {
      const payload: UserInput = req.body
      const user = await UserService.create(payload)
      return res.status(201).json(user)
    } catch (e) {
      // console.log(e)
      return res.status(500).json({ e })
    }
  }
}
