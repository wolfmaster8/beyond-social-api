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

    await this.verifyIfUsernameIsTaken({ username: payload.username })
    await this.verifyIfEmailIsTaken({ email: payload.email })

    const user = await UserRepository.create(payload)
    return user
  }

  public static async getUserWithPosts({
    username,
  }: {
    username: string
  }): Promise<UserOutput | null> {
    const user = await UserRepository.getUserWithPosts({ username })
    if (!user) throw Error(ErrorsEnum.NOT_FOUND)
    return user
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

  public static async update(payload: Partial<UserInput> & { userId: number }) {
    if (payload.password || payload.createdAt || payload.updatedAt)
      throw Error(ErrorsEnum.BAD_REQUEST)

    if (payload.username) {
      await this.verifyIfUsernameIsTaken({ username: payload.username })
    }

    if (payload.email) {
      await this.verifyIfEmailIsTaken({ email: payload.email })
    }

    return UserRepository.update(payload)
  }

  private static async verifyIfUsernameIsTaken({
    username,
  }: {
    username: string
  }) {
    const usernameAlreadyRegistered = await this.getByUsername({
      username,
    })

    if (usernameAlreadyRegistered)
      throw Error(ErrorsEnum.USERNAME_ALREADY_REGISTERED)
  }

  private static async verifyIfEmailIsTaken({ email }: { email: string }) {
    const emailAlreadyRegistered = await this.getByEmail({
      email,
    })

    if (emailAlreadyRegistered) throw Error(ErrorsEnum.EMAIL_ALREADY_REGISTERED)
  }
}
