import { UserInput, UserSanitizedOutput } from '../../db/models/User'
import UserRepository from '../../db/repository/UserRepository'

export default class UserService {
  public static async create(payload: UserInput): Promise<UserSanitizedOutput> {
    const user = await UserRepository.create(payload)
    return user
  }
}
