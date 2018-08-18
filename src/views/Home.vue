<template>
  <div class="home">
    <router-link tag="li" to="/login">
      <a>/login</a>
    </router-link>
    <router-link tag="li" to="/logout">
      <a>/logout</a>
    </router-link>
    <router-link tag="li" to="/profile">
      <a>/profile</a>
    </router-link>
    <router-link tag="li" to="/projects">
      <a>/projects</a>
    </router-link>
    <hr>
    <div>
      <h3>ログイン状態</h3>
      <div v-if="user">
        ログイン中です
        {{ this.user }}
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'

@Component({
  components: {
  },
  })
export default class Home extends Vue {
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
