
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

  public static async all (): Promise<Project[]> {
    const result = await db.collection('projects').get()
    const docs: any[] = []
    result.forEach((r) => {
      const obj = r.data()
      obj.uid = r.id
      docs.push(obj)
    })
    return docs.map((doc) => new Project(doc))
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
    const docs: any[] = []
    result.forEach((r) => {
      const obj = r.data()
      obj.uid = r.id
      docs.push(obj)
    })
    const data = docs[0]

    if (!data) { throw new Error('projectが見つかりませんでした') }
    return new Project(data)
  }

  public static async findByProjectId (project_id: string): Promise<Project> {
    const ref = await db.collection('projects').doc(project_id)
    const doc = await ref.get()

    if (doc.exists) {
      var data = doc.data()
      if (data) {
        return new Project(data)
      } else {
        throw new Error('projectが見つかりませんでした')
      }
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      throw new Error('projectが見つかりませんでした')
    }
  }

  public async removeMember (removeUserUid: string): Promise<void> {
    if (!this.members) { return }
    const newMembers = this.members.filter((m) => m.uid !== removeUserUid)
    const newMembersObj = newMembers.map(m => Object.assign({}, m))
    await db.collection('projects').doc(this.uid).set({
      members: newMembersObj
    }, { merge: true })
  }

  public async addMember (user: User): Promise<void> {
    const newMembers = this.members
      ? this.members.concat(user)
      : [user]
    const newMembersObj = newMembers.map(u => Object.assign({}, u))

    await db.collection('projects').doc(this.uid).set({
      members: newMembersObj
    }, { merge: true })
  }
}
