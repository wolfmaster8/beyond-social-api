import md5 from 'crypto-js/md5'

export default class UserHelper {
  public static generateGravatarUri({ email }: { email: string }) {
    const hashDigest = md5(email)
    const gravatarURI = 'https://www.gravatar.com/avatar'
    return `${gravatarURI}/${hashDigest}?d=retro`
  }
}
