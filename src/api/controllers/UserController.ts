import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { nanoid } from 'nanoid'
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
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Ocurrió un error al recuperar tu perfil' })
    }
  }

  public static async getUserWithPosts(req: Request, res: Response) {
    try {
      const { username } = req.params
      const user = await UserService.getUserWithPosts({ username })
      return res.status(200).json(user)
    } catch (e: any) {
      if (e?.message) {
        if (e.message === ErrorsEnum.NOT_FOUND) {
          return res.status(400).json({
            message: 'No encontramos al usuario que buscas.',
          })
        }
      }
      return res
        .status(500)
        .json({ message: 'Ocurrió un error al recuperar tu perfil' })
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      await UserService.update(req.body)
      return res.status(204).json()
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
      return res
        .status(500)
        .json({ message: 'Ocurrió un error al editar tu perfil' })
    }
  }

  public static async uploadAvatar(req: Request, res: Response) {
    try {
      console.log(req.files)
      if (!req.files) throw Error(ErrorsEnum.BAD_REQUEST)

      const avatar = req.files.avatar as UploadedFile

      console.log(req.files.avatar)
      if (!avatar.name.match(/\.(jpg|jpeg|png)$/i))
        throw Error(ErrorsEnum.BAD_REQUEST)

      const { userId } = req.body

      const avatarNanoId = nanoid()

      const avatarExtension = avatar.name.split('.').at(-1)

      const avatarUrl = `/uploads/${avatarNanoId}.${avatarExtension}`

      await avatar.mv(`.${avatarUrl}`)

      await UserService.update({ avatarUrl, userId })

      return res.status(201).json()
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Ocurrió un error al subir tu foto' })
    }
  }
}
