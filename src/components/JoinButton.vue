<template>
  <div v-if="joinEnable">
    <md-button
      class="md-raised"
      :disabled="false"
      @click.native="onClickJoin"
    >
      Join
    </md-button>
  </div>
  <div v-else>
    <md-button
      class="md-raised md-disable"
      :disabled="true"
    >
      Joined
    </md-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ProjectCard extends Vue {
  @Prop() private joinEnable!: boolean;
  @Prop() private onClickJoin!: Function;
}
</script>

<style lang="scss" scoped>
  .md-button {
    color: white;
    background-color: #F3933D;
  }
  .md-disable {
    color: white;
    background-color: #b4b4b4;
    cursor: text;
  }
  .md-disable :hover {
    background-color: #b4b4b4;
  }
  .md-button:before{
    transition: none;
  }
</style>
