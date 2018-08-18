<template>
    <div class="user">
        <h3>プロフィール</h3>
        <div class="profile">
            <p>
            名前 <span><input v-model="name"></span>
            </p>
            <p> {{name}} </p>
            <p>
            あだ名 <span><input v-model="nickname"></span>
            </p>
            <p>
            やりたい役職 <span><input v-model="role"></span>
            </p>
            <p>
            スキル <span><input v-model="skill"></span>
            </p>
            <p>
            所属 <span><input v-model="organization"></span>
            </p>
            <p>
            参加したきっかけ <span><input v-model="purpose"></span>
            </p>
            <p>
            その他 <span><textarea v-model="none"></textarea></span>
            </p>
        </div>
        <h3>アイディア</h3>
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
        <button @click="join">登録</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  protected name = '';
  protected nickname = '';
  protected role = '';
  protected skill = '';
  protected organization = '';
  protected purpose = '';
  protected none = '';
  protected title = '';
  protected overview = '';
  protected skills = '';
}
</script>
