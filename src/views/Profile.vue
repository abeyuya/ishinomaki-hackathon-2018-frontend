<template>

  <div v-if="user">
    <div class="user">
        <h3>プロフィール</h3>
        <div class="profile">
            <p>
              名前 <span><input v-model="user_name"></span>
            </p>
            <p>
              あだ名 <span><input v-model="nickname"></span>
            </p>
            <p>
              やりたい役職 <span><input v-model="role"></span>
            </p>
            <p>
              スキル <span><input v-model="skill"></span>
            </p>
            <p>
              所属 <span><input v-model="organization"></span>
            </p>
            <p>
              参加したきっかけ <span><input v-model="purpose"></span>
            </p>
            <p>
              その他 <span><textarea v-model="note"></textarea></span>
            </p>
        </div>
        <h3>アイディア</h3>
        <div class="project">
            <p>
                タイトル <span><input v-model="title"></span>
            </p>
            <p>
                概要 <span><textarea v-model="overview"></textarea></span>
            </p>
            <p>
                必要な技術 <span><input v-model="need_skills"></span>
            </p>
        </div>
        <button @click="regist">登録</button>
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
export default class Profile extends Vue {
  user: User | null = null
  project: Project | null = null
  db = firebase.firestore()

  /* eslint-disable */
  protected user_name = '';
  protected user_id = '';
  protected photo_url = '';
  protected nickname = '';
  protected role = '';
  protected skill = '';
  protected organization = '';
  protected purpose = '';
  protected note = '';
  protected title = '';
  protected overview = '';
  protected need_skills = '';
  /* eslint-enable */

  created () {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user = await User.findByUid(user.uid)
        this.photo_url = user.photoURL || ''
        this.user_name = this.user.name || ''
        this.nickname = this.user.nickname || ''
        this.role = this.user.role || ''
        this.skill = this.user.skill || ''
        this.organization = this.user.organization || ''
        this.purpose = this.user.purpose || ''
        this.note = this.user.note || ''

        try {
          this.project = await Project.findByOwner(user.uid)
          this.title = this.project.title || ''
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

  async regist (): Promise<void> {
    if (this.user === null) {
      return
    }
    if (this.user.uid === undefined) {
      return alert('ログインしてください')
    }

    this.saveProfile()
    this.saveProject()
    console.log('保存しました todo: トーストみたいなので表示したい')
  }

  private async saveProfile () {
    if (this.user === null) { return }
    await this.db.collection('users').doc(`${this.user.uid}`).set({
      name: this.user_name,
      photo_url: this.photo_url,
      nickname: this.nickname,
      role: this.role,
      skill: this.skill,
      organization: this.organization,
      purpose: this.purpose,
      note: this.note
    }, { merge: true })
  }

  private async saveProject () {
    if (this.user === null) { return }
    if (!this.title || this.title === '') { return }

    if (this.project === null) {
      const newProject = await this.db.collection('projects').add({
        title: this.title,
        overview: this.overview,
        need_skills: this.need_skills,
        owner: Object.assign({}, this.user)
      })
      await this.db.collection('projects').doc(newProject.id).set({
        uid: newProject.id
      }, { merge: true })
    } else {
      await this.db.collection('projects').doc(this.project.uid).set({
        title: this.title,
        overview: this.overview,
        need_skills: this.need_skills,
        owner: Object.assign({}, this.user)
      }, { merge: true })
    }
  }
}

</script>
