
import { db } from '../lib/firebase'

export default class User {
  uid?: string;
  icon_url?: string;

  constructor (json: object) {
    Object.assign(this, json)
  }

  public static async create (param: { uid: string, icon_url?: string }): Promise<User> {
    await db.collection('users').doc(param.uid).set(param, { merge: true })
    const user = new User(param)
    return user
  }
}