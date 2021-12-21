import {
  UserInput,
  UserOutput,
  UserSanitizedOutput,
} from '../../db/models/User'
import UserRepository from '../../db/repository/UserRepository'

export default class UserService {
  public static async create(payload: UserInput): Promise<UserSanitizedOutput> {
    const user = await UserRepository.create(payload)
    return user
  }

  public static async getByUsername({
    username,
  }: {
    username: string
  }): Promise<UserOutput | null> {
    return UserRepository.getByUsername({ username })
  }
}
