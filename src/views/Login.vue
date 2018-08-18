<template>
  <div>
    <button @click="clickGithubSignin">Sign in with Github</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'

const provider = new firebase.auth.GithubAuthProvider()

@Component
export default class Login extends Vue {
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/profile')
      }
    })
  }

  async clickGithubSignin (): Promise<void> {
    const result = await firebase.auth().signInWithPopup(provider)

    if (!result.user) {
      return alert('ログインに失敗しました')
    }

    const { uid, photoURL } = result.user
    const param = { uid, icon_url: photoURL || undefined }
    const user = await User.create(param)
  }
}
</script>
