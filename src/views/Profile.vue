<template>

  <div v-if="user">
    <div class="user">
        <!-- <header>
        </header>
        <h1>hackage</h1> -->
        <img src="https://yt3.ggpht.com/a-/ACSszfHx5NjkvUKI-erg6MSo3-MeZgEWOZgFTK8orQ=s900-mo-c-c0xffffffff-rj-k-no">
        <div class="profile">
            <p>お名前</p>
            <input type="text" v-model="user_name" placeholder="石巻太郎">
            <p>あだ名</p>
            <input type="text" v-model="nickname" placeholder="ハック">
            <p>やりたい役割</p>
            <input type="text" v-model="role" placeholder="プログラマ">
            <p>スキル</p>
            <input type="text" v-model="skill" placeholder="Java, Kotlin, Python, Processing, Swift">
            <p>所属</p>
            <input type="text" v-model="organization" placeholder="GDG石巻">
            <p>参加したきっかけ</p>
            <textarea v-model="purpose" rows="2" placeholder="いろいろなエンジニアの方と開発を行って刺激をうけにきました。"/>
            <p>その他</p>
            <textarea v-model="none" rows="2" placeholder="石巻ハッカソンに毎年参加してます。Android大好きです"/>
            <p>アイデア名</p>
            <input type="text" v-model="title" placeholder="Hackage(ハッケージ)">
            <p>アイデア概要</p>
            <textarea v-model="overview" rows="2" placeholder="ハッピー+ハッカソン+パッケージでハッカソンをハック"/>
            <p>想定している技術</p>
            <input type="text" v-model="need_skills" placeholder="Vue.js, Firebase">
            <!-- <p>アイディアの有無</p>
            <label><input type="radio" v-model="radio" value="Yes">ある</label>
            <label><input type="radio" v-model="radio" value="No">ない</label>
            <p>{{radio}}</p> -->
        </div>
        <md-button class="md-raised save" @click="regist">登録</md-button>
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

<style lang="scss" scoped>
  header{
    height: 4rem;
    background-color: #52B574;
  }
  h1{
      color:#52B574;
  }
  span{
      border-bottom: solid 0.3rem #52B574;
  }
  img{
    height: 2rem;
  }
  p{
      color:#52B574;
      padding-left: 0;
          margin-bottom: 30px;
  }
  .md-button{
      background-color:#52B574;
      color: white;
      border-radius: 1rem;
  }
  input[type="text"], textarea{
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 2px solid #52B574;
    width: 60%;
    font-size: 20px;
    text-align: center;
  }
  textarea{
    font-size: 16px;
  }
  .save{
    margin-top: 40px;
  }
  .user{
    padding-top: 20px;
  }

</style>
