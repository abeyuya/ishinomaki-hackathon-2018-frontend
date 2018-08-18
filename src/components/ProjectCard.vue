<template>
  <div>
    <md-card>
      <md-card-header>
        <md-card-media>
          <img :src="project.owner.photo_url">
        </md-card-media>
        <md-card-header-text>
          <div class="md-title">{{ project.title }}</div>
        </md-card-header-text>
      </md-card-header>
      <md-card-content>
        <h3 class="md-overviewd">概要</h3>
        {{ project.overview }}
        <h3 class="md-skills">想定している技術</h3>
        <p>{{ project.need_skills }}</p>
        <div v-for="member in project.members" :key="project.members">
          <md-icon>person</md-icon>
        </div>
      </md-card-content>
      <md-button class="md-raised">Join</md-button>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Project from '../model/project'

@Component
export default class ProjectCard extends Vue {
  @Prop() private project!: Project;
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 440px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-button {
    color: white;
    background-color: #FF8856;
  }
</style>
