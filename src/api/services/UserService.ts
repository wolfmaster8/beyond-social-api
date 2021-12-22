import {
  UserInput,
  UserOutput,
  UserSanitizedOutput,
} from '../../db/models/User'
import UserRepository from '../../db/repository/UserRepository'
import ErrorsEnum from '../utils/enums/ErrorsEnum'
import { GenericIdParameter } from '../utils/GlobalTypes'

export default class UserService {
  public static async create(payload: UserInput): Promise<UserSanitizedOutput> {
    if (
      !payload.username ||
      !payload.password ||
      !payload.email ||
      !payload.firstName ||
      !payload.lastName
    )
      throw Error(ErrorsEnum.BAD_REQUEST)
    const usernameAlreadyRegistered = await this.getByUsername({
      username: payload.username,
    })

    if (usernameAlreadyRegistered)
      throw Error(ErrorsEnum.USERNAME_ALREADY_REGISTERED)

    const emailAlreadyRegistered = await this.getByEmail({
      email: payload.email,
    })

    if (emailAlreadyRegistered) throw Error(ErrorsEnum.EMAIL_ALREADY_REGISTERED)

    const user = await UserRepository.create(payload)
    return user
  }

  public static async getUserWithPosts({
    id,
  }: GenericIdParameter): Promise<UserOutput | null> {
    return UserRepository.getUserWithPosts({ id })
  }

  public static async getUserProfile({
    id,
  }: GenericIdParameter): Promise<UserOutput | null> {
    return UserRepository.getUserProfile({ id })
  }

  public static async getByUsername({
    username,
  }: {
    username: string
  }): Promise<UserOutput | null> {
    return UserRepository.getByUsername({ username })
  }

  public static async getByEmail({
    email,
  }: {
    email: string
  }): Promise<UserOutput | null> {
    return UserRepository.getByEmail({ email })
  }
}
