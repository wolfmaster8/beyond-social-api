import User, {
  UserInput,
  UserOutput,
  UserSanitizedOutput,
} from '../models/User'
import PasswordHelper from '../../api/utils/helpers/PasswordHelper'
import { GenericIdParameter } from '../../api/utils/GlobalTypes'

export default class UserRepository {
  public static async create(payload: UserInput): Promise<UserSanitizedOutput> {
    const hashedPassword = await PasswordHelper.hashPassword({
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

  public static async getUserProfile({
    id,
  }: GenericIdParameter): Promise<UserOutput | null> {
    return this.getById({ id })
  }

  public static async getById({
    id,
  }: GenericIdParameter): Promise<UserOutput | null> {
    return User.findOne({
      where: { id },
      attributes: ['id', 'firstName', 'lastName'],
    })
  }

  public static async getByUsername({
    username,
  }: {
    username: string
  }): Promise<UserOutput | null> {
    return User.findOne({ where: { username } })
  }

  public static async getByEmail({
    email,
  }: {
    email: string
  }): Promise<UserOutput | null> {
    return User.findOne({ where: { email } })
  }
}
