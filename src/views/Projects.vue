<template>
  <div v-if="user && projects">
    <div v-for="project in projects" :key="project.uid">
      <ProjectCard
        :project="project"
        :joinEnable="true"
        :onClickJoin="onClickJoin"
      />
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'
import ProjectCard from '@/components/ProjectCard.vue'
import Project from '../model/project'

const provider = new firebase.auth.GithubAuthProvider()

@Component({
  components: {
  ProjectCard,
  }
  })

export default class Projects extends Vue {
  user: User | null = null
  projects: Project[] | null = null;

  created () {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user = await User.findByUid(user.uid)

        try {
          this.projects = await Project.all()
        } catch (e) {
          this.projects = null
        }
      } else {
        this.user = null
      }
    })
  }

  onClickJoin () {
    console.log('onClickJoin.props')
  }
}
</script>
