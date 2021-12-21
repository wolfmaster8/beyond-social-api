import { Request, Response } from 'express'
import AuthService from '../services/AuthService'
import { UserLogInCredentials } from '../../db/models/User'

export default class AuthController {
  public static async logIn(req: Request, res: Response) {
    try {
      const { username, password }: UserLogInCredentials = req.body
      const token = await AuthService.logIn({ username, password })
      return res.status(200).json(token)
    } catch (e: any) {
      if (e?.message) {
        return res.status(401).json({
          message:
            'Parece que el usuario o la contraseña no corresponden. Revisa tus credenciales e intenta nuevamente',
        })
      }
      return res.status(500).json({})
    }
  }
}
