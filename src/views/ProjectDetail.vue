<template>
  <div class="project">
    <div class="project_detail">
      <md-avatar class="md-large">
        <img :src="project.owner.photo_url">
      </md-avatar>
      <h1 class="title">{{project_title}}</h1>
      <h2 class="owner_name">{{owner_name}}</h2>
      <JoinButton
        :joinEnable="joinEnable()"
        :onClickJoin="join"
        :needLogin="needLogin()"
      />
      <h2>概要</h2>
      <p>{{overview}}</p>
      <h2>想定している技術</h2>
      <div class="skill_box">
        <p class="need_skills">{{need_skills}}</p>
      </div>
      <h2>メンバー</h2>
      <md-card class="member_card" v-for="member in project.members" :key="member.uid">
        <md-avatar class="member_icon">
            <img :src="member.photo_url">
        </md-avatar>
        <div class="member_card_info">
          <h2>あだ名</h2>
          <p class='member'>{{member.nickname}}</p>
          <h2>所属</h2>
          <p class='member'>{{member.organization}}</p>
          <h2>スキル</h2>
          <p class='member'>{{member.skill}}</p>
        </div>
      </md-card>
      <JoinButton
        :joinEnable="joinEnable()"
        :onClickJoin="join"
        :needLogin="needLogin()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { db, firebase } from '../lib/firebase'
import User from '../model/user'
import Project from '../model/project'
import JoinButton from '@/components/JoinButton.vue'

@Component({
  components: {
  JoinButton,
  }
  })
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
        db.collection('users').doc(this.user.uid).onSnapshot((doc) => {
          const data= doc.data()
          if (data) {
            this.user = new User(data)
          }
        });
      } else {
        this.user = null
      }
    })

    const project_id = this.$route.query.project_id
    db.collection('projects').doc(project_id).onSnapshot((doc) => {
      const data = doc.data()
      if (data) {
        this.project = new Project(data)
        this.project_title = data.title || ''
        this.owner_name = (data.owner && data.owner.name) || ''
        this.overview = data.overview || ''
        this.need_skills = data.need_skills || ''
      }
    });
  }

  joinEnable (): boolean {
    const user = this.user
    if (!user) { return false }
    if (!this.project || !this.project.members) { return true }

    const exist = this.project.members.find((m) => m.uid === user.uid)
    return !exist
  }

  join () {
    if (!this.user) { return }
    if (!this.project || !this.project.uid) { return }

    this.user.joinProject(this.project.uid)
  }

  needLogin () {
    return !this.user
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  h1.title {
    color: #52B574;
    margin: 40px 0 0;
    font-weight: 900;
    font-size: 30px;
  }

  h2 {
    color: #52B574;
    font-weight: 300;
    margin: 50px 0 50px 0;
    font-size: 20px;
  }

  h2.owner_name {
    font-weight: 200;
    margin: 10px 0 0;
  }

  p {
    color: #B4B4B4;
  }

  p.need_skills {
    font-weight: 300;
    width: 70vw;
    border: 1px solid #B1EAD3;
    border-style: none none solid none;
    padding: 0px 0px 10px 0px;
  }

  .skill_box {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: stretch;
    align-items: stretch;
    text-align: center;
  }

  .md-button {
    color: white;
    background-color: #F3933D;
    width: 40vw;
    height: 48px;
    margin: 40px 0px 0px 0px;
  }

  .md-avatar{
    margin-top: 2rem;
  }
  .member_icon{
    margin-bottom: 2rem;
  }

  .member_card{
    display: flex;
    padding: 10px;
    margin: 10px;

    .member_icon {
      width: 20%;
      height: 100%;
    }

    .member_card_info {
      width: 80%;
    }
  }

  p.member{
    font-weight: 300;
    border: 1px solid #B1EAD3;
    border-style: none none solid none;
    padding: 0px 0px 10px 0px;
  }
</style>
