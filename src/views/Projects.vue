<template>
  <div v-if="user && projects">
    <div v-for="project in projects" :key="project.uid">
      <ProjectCard
        :project="project"
        :joinEnable="joinEnable(project)"
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
import { firebase, db } from '../lib/firebase'
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

    db.collection('projects').onSnapshot((doc) => {
      this.projects = doc.docs.map((d) => {
        console.log(d.data())
        return new Project(d.data())
      })
    });
  }

  joinEnable (project: Project): boolean {
    const user = this.user
    if (!user) { return false }
    if (!project.members) { return true }

    const exist = project.members.find((m) => m.uid === user.uid)
    return !exist
  }

  onClickJoin (project: Project) {
    if (!this.user) { return }
    if (!project.uid) { return }

    this.user.joinProject(project.uid)
  }
}
</script>
