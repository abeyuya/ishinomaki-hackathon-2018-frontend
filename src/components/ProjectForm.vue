<template>
  <div class="project">
    <p>
      タイトル <span><input v-model="title"></span>
    </p>
    <p>
      概要 <span><textarea v-model="overview"></textarea></span>
    </p>
    <p>
      必要な技術 <span><input v-model="skills"></span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ProjectForm extends Vue {
  protected title = '';
  protected overview = '';
  protected skills = '';
}
</script>