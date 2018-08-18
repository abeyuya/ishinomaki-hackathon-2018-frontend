
import { db, firebase } from '../lib/firebase'
import User from './user'

export default class Project {
  /* eslint-disable */
  uid?: string;
  title?: string;
  overview?: string;
  need_skills?: string;
  owner?: User;
  members?: User[];
  /* eslint-enable */

  constructor (json: firebase.firestore.DocumentData) {
    Object.assign(this, json)

    if (json['owner']) {
      this.owner = new User(json['owner'])
    }

    if (json['members']) {
      this.members = json['members'].map((m: object) => new User(m))
    }
  }

  public static async create (param: { owner: User }): Promise<Project> {
    const project = new Project(param)
    const obj = Object.assign({}, project)
    await db.collection('projects').add(param)
    return project
  }

  public static async findByOwner (uid: string): Promise<Project> {
    const result = await db.collection('projects')
      .where('owner.uid', '==', uid)
      .get()
    const docs: firebase.firestore.DocumentData[] = []
    result.forEach((r) => {
      docs.push(r.data())
    })
    const data = docs[0]

    if (!data) { throw new Error('projectが見つかりませんでした') }
    return new Project(data)
  }
}
