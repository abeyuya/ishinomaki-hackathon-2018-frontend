<template>
  <div>
    <md-card>
      <md-card-header>
        <md-card-media>
          <img :src="project.owner.photo_url">
        </md-card-media>
        <md-card-header-text>
          <div class="flexbox_title">
            <div class="md-title">{{ project.title }}</div>
          </div>
        </md-card-header-text>
      </md-card-header>
      <md-card-content>
        <h3 class="md-overviewd">概要</h3>
        <p>{{ project.overview }}</p>
        <h3 class="md-skills">想定している技術</h3>
        <p class="need_skills">{{ project.need_skills }}</p>
        <md-avatar v-for="member in project.members" :key="member.uid">
          <img :src="member.photo_url" class="member_icon">
        </md-avatar>
      </md-card-content>
      <JoinButton
        :joinEnable="joinEnable"
        :onClickJoin="() => onClickJoin(project)"
        :needLogin="needLogin"
      />
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import JoinButton from '@/components/JoinButton.vue'
import Project from '../model/project'

@Component({
  components: {
  JoinButton,
  }
  })
export default class ProjectCard extends Vue {
  @Prop() private project!: Project;
  @Prop() private joinEnable!: boolean;
  @Prop() private onClickJoin!: Function;
  @Prop() private needLogin!: boolean;
}
</script>

<style lang="scss" scoped>

  .md-title {
    color: #52B574;
    font-weight: 900;
    font-size: 19px;
    text-align: center;
  }

  h3 {
    color: #52B574;
    font-weight: 500;
    margin: 10px 0 0;
    font-size: 13px;
  }

  h2.owner_name {
    font-weight: 200;
    margin: 10px 0 0;
  }

  p {
    color: #B4B4B4;
  }

  p.need_skills {
    font-weight: 300;
    border: 1px solid #B1EAD3;
    border-style: none none solid none;
    padding: 0px 0px 10px 0px;
    width: 100%
  }

  .flexbox_title {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: stretch;
    align-items: center;
    text-align: center;
    height: 100%;
  }

  .md-card {
    width: 100%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    padding: 0px 0px 20px;
  }
</style>
