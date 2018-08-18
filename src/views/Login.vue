<template>
  <div>
    <button @click="clickGithubSignin">Sign in with Github</button>
    <button @click="test">check</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'

const provider = new firebase.auth.GithubAuthProvider()

export default class Login extends Vue {
  async clickGithubSignin (): Promise<void> {
    const result = await firebase.auth().signInWithPopup(provider)

    if (!result.user) {
      return alert('ログインに失敗しました')
    }

    const { uid, photoURL } = result.user
    const param = { uid, photoURL: photoURL || undefined }
    const user = await User.create(param)
  }

  test (): void {
    const user = firebase.auth().currentUser
    console.log(user)
  }
}
</script>
