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
import { db, firebase } from '../lib/firebase'
import User from '../model/user'
import Project from '../model/project'
import Projects from '@/views/Projects.vue';

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
        if (this.project) {
            try {
                this.project_title = this.project.title || ''
                this.owner_name = this.project.owner.name || ''
                this.overview = this.project.overview || ''
                this.need_skills = this.project.need_skills || ''
            } catch (e) {
                this.project = null
            }
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
