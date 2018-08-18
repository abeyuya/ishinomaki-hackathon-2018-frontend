<template>
  <div v-if="user">
    <div class="project">
        <div class="project_detail">
            <h1 class="title">{{project_title}}</h1>
            <h2 class="owner_name">{{owner_name}}</h2>
            <md-button class="join" @click="join">Join</md-button>
            <h2>概要</h2>
            <p>{{overview}}</p>
            <h2>想定している技術</h2>
            <div class="flexbox">
              <p class="need_skills">{{need_skills}}</p>
            </div>
            <h2>メンバー</h2>
            <md-button class="join" @click="join">Join</md-button>
        </div>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { db, firebase } from '../lib/firebase'
import User from '../model/user'
import Project from '../model/project'
import Projects from '@/views/Projects.vue'

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
        let project_id = this.$route.query.project_id

        this.project = await Project.findByProjectId(project_id)
        console.log(this.project)
        try {
          this.project_title = this.project.title || ''
          this.owner_name = (this.project.owner && this.project.owner.name) || ''
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
    margin: 50px 0 0;
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

  .flexbox {
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
</style>
