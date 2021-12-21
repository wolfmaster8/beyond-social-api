import bcrypt from 'bcrypt'

export default class PasswordHelper {
  public static async hashPassword({
    password,
  }: {
    password: string | undefined
  }): Promise<string> {
    if (!password) throw Error('ERROR')
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
  }

  public static async comparePaswords({
    savedPassword,
    password,
  }: {
    savedPassword: string
    password: string
  }): Promise<boolean> {
    return bcrypt.compare(password, savedPassword)
  }
}
