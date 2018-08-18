<template>
  <div>
    {{ this.user }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'

const provider = new firebase.auth.GithubAuthProvider()

@Component
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
