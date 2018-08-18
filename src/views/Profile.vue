<template>
    <div class="user">
        <header>
        </header>
        <h1>hackage</h1>
        <img src="https://yt3.ggpht.com/a-/ACSszfHx5NjkvUKI-erg6MSo3-MeZgEWOZgFTK8orQ=s900-mo-c-c0xffffffff-rj-k-no">
        <div class="profile">
            <p>お名前</p>
            <span><input v-model="name"></span>
            <p>あだ名</p>
            <span><input v-model="nickname"></span>
            <p>やりたい役職</p>
            <span><input v-model="role"></span>
            <p>スキル</p>
            <span><input v-model="skill"></span>
            <p>所属</p>
            <span><input v-model="organization"></span>
            <p>参加したきっかけ</p>
            <span><input v-model="purpose"></span>
            <p>その他</p>
            <span><input v-model="none"></span>
            <p>アイディアの有無</p>
            <label><input type="radio" v-model="radio" value="Yes">ある</label>
            <label><input type="radio" v-model="radio" value="No">ない</label>
            <p>{{radio}}</p>
        </div>
        <md-button class="md-raised" @click="join">続ける</md-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

@Component
export default class Profile extends Vue {
  protected name = '';
  protected nickname = '';
  protected role = '';
  protected skill = '';
  protected organization = '';
  protected purpose = '';
  protected none = '';
  protected radio = '';
}
</script>

<style lang="scss" scoped>
  header{
    height: 4rem;
    background-color: #33CC66;
  }
  h1{
      color:#33CC66;
  }
  span{
      border-bottom: solid 0.3rem #33CC66;
  }
  img{
    height: 2rem;
  }
  p{
      color:#33CC66;
      padding-left: 0;
  }
  .md-button{
      background-color:#33CC66;
      color: white;
      border-radius: 1rem;
  }
</style>
