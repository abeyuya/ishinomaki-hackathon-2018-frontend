<template>

  <div v-if="user">
    <div class="project">
        <div class="project_detail">
            <h3>{{project_title}}</h3>
            <h4>{{owner_name}}</h4>
            <button class="join" @click="join">join</button>
            <h4>概要</h4>
            <p>{{overview}}</p>
            <h4>想定している技術</h4>
            <p>{{need_skills}}</p>
            <h4>メンバー</h4>
            <button class="join" @click="join">join</button>
        </div>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'
import Project from '../model/project'

@Component
export default class ProjectDetail extends Vue {
  user: User | null = null
  project: Project | null = null
  db = firebase.firestore()

  /* eslint-disable */
  protected project_title = '';
  protected owner_name = '';
  protected photo_url = '';
  protected overview = '';
  protected need_skills = '';
  /* eslint-enable */

  created () {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user = await User.findByUid(user.uid)
        try {
          this.project = await Project.findByOwner(user.uid)
          this.project_title = this.project.title || ''
          this.owner_name = this.project.owner.name || ''
          this.overview = this.project.overview || ''
          this.need_skills = this.project.need_skills || ''

        } catch (e) {
          this.project = null
        }
      } else {
        this.user = null
      }
    })
  }

  async join (): Promise<void> {
    if (this.user === null) {
      return
    }
    if (this.user.uid === undefined) {
      return alert('ログインしてください')
    }
    console.log('保存しました todo: トーストみたいなので表示したい')
  }

//   private async saveProfile () {
//     if (this.user === null) { return }
//     await this.db.collection('users').doc(`${this.user.uid}`).set({
//       name: this.user_name,
//       photo_url: this.photo_url,
//       nickname: this.nickname,
//       role: this.role,
//       skill: this.skill,
//       organization: this.organization,
//       purpose: this.purpose,
//       note: this.note
//     }, { merge: true })
//   }

//   private async saveProject () {
//     if (this.user === null) { return }
//     if (this.project === null) {
//       await this.db.collection('projects').add({
//         title: this.title,
//         overview: this.overview,
//         need_skills: this.need_skills,
//         owner: Object.assign({}, this.user)
//       })
//     } else {
//       await this.db.collection('projects').doc(this.project.uid).set({
//         title: this.title,
//         overview: this.overview,
//         need_skills: this.need_skills,
//         owner: Object.assign({}, this.user)
//       }, { merge: true })
//     }
//   }
}

</script>
