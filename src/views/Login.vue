<template>
  <div>
    <header>
    </header>
    <h1>
      <img src="../assets/Green_Logo.jpg" alt="Hackage"/>
    </h1>
    <md-button class="md-raised" @click="clickGithubSignin">
      <img id="octcat-icon" src="../assets/octicon.jpg" />
      Sign in with Github
    </md-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

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

<style lang="scss" scoped>
  h1{
    color:#33CC66;
    font-size: 5rem;
    margin-top: 10rem;
  }
  .md-button{
    background-color: #33CC66;
    color: white;
    border-radius: 1rem;
    margin-top: 10rem;
  }
  #octcat-icon {
    width: 2rem
  }
</style>
