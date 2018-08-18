
import { db } from '../lib/firebase'

export default class User {
  /* eslint-disable */
  uid?: string;
  photo_url?: string;
  user_name?: string;
  nickname?: string;
  role?: string;
  skill?: string;
  organization?: string;
  purpose?: string;
  note?: string;
  /* eslint-enable */

  constructor (json: object) {
    Object.assign(this, json)
  }

  public static async create (param: { uid: string, photo_url?: string }): Promise<User> {
    const user = new User(param)
    const obj = Object.assign({}, user)
    await db.collection('users').doc(param.uid).set(obj, { merge: true })
    return user
  }
}
