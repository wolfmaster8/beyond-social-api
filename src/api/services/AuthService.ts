import jwt from 'jsonwebtoken'

import { UserLogInCredentials } from '../../db/models/User'
import ErrorsEnum from '../utils/enums/ErrorsEnum'
import UserService from './UserService'
import PasswordHelper from '../utils/helpers/PasswordHelper'

export default class AuthService {
  public static async logIn({
    password,
    username,
  }: UserLogInCredentials): Promise<{ token: string }> {
    const savedUser = await UserService.getByUsername({ username })
    if (!savedUser) throw new Error(ErrorsEnum.RESOURCE_NOT_FOUND)
    const passwordsMatch = await PasswordHelper.comparePaswords({
      savedPassword: savedUser.password,
      password,
    })
    if (!passwordsMatch) throw new Error(ErrorsEnum.INVALID_CREDENTIALS)
    const token = jwt.sign(
      { userId: savedUser.id },
      process.env.APP_SECRET_KEY ?? '',
      {
        expiresIn: '3h',
      }
    )
    return { token }
  }
}
