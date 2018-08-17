<template>
  <div v-if="user">
    <ProjectCard></ProjectCard>
    <ProjectCard></ProjectCard>
    <ProjectCard></ProjectCard>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'
import ProjectCard from '@/components/ProjectCard.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

const provider = new firebase.auth.GithubAuthProvider()

@Component({
  components: {
  ProjectCard,
  }
  })

export default class Projects extends Vue {
  user: User | null = null

  created () {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user = await User.findByUid(user.uid)
      } else {
        this.user = null
      }
    })
  }
}
</script>
