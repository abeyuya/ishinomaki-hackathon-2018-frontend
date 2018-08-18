<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'

const provider = new firebase.auth.GithubAuthProvider()

@Component
export default class Login extends Vue {
  async created () {
    await firebase.auth().signOut()
    this.$router.push('/login')
  }
}
</script>
