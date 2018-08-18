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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  },
  })
export default class Home extends Vue {}
</script>
