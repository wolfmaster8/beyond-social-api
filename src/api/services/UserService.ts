import { UserInput, UserOutput } from '../../db/models/User'
import UserRepository from '../../db/repository/UserRepository'

export default class UserService {
  public static async create(payload: UserInput): Promise<UserOutput> {
    return UserRepository.create(payload)
  }
}
