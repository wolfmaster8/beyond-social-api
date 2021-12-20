import User, { UserInput, UserOutput } from '../models/User'

export default class UserRepository {
  public static async create(payload: UserInput): Promise<UserOutput> {
    const user = await User.create(payload)
    return user
  }
}
