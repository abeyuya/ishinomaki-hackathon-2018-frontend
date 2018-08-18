<template>
  <div v-if="user">
    {{ this.user }}
    <ul id="projects">
      <li v-for="project in projects" :key="project.uid">
        {{ project.title }}
      </li>
    </ul>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'
import Project from '../model/project'

const provider = new firebase.auth.GithubAuthProvider()

@Component
export default class Projects extends Vue {
  user: User | null = null
  projects: Project[] | null = null

  created () {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user = await User.findByUid(user.uid)

        try {
          this.projects = await Project.all()
          console.log(this.projects)
        } catch (e) {
          this.projects = null
        }
      } else {
        this.user = null
      }
    })
  }
}
</script>
