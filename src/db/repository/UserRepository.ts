import User, { UserInput, UserSanitizedOutput } from '../models/User'
import AuthService from '../../api/services/AuthService'

export default class UserRepository {
  public static async create(payload: UserInput): Promise<UserSanitizedOutput> {
    const hashedPassword = await AuthService.hashPassword({
      password: payload.password,
    })
    const updatedUser: UserInput = { ...payload, password: hashedPassword }
    const user = await User.create(updatedUser)
    const sanitizedUser: UserSanitizedOutput = {
      id: user.id,
      email: user.email,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
    return sanitizedUser
  }
}
