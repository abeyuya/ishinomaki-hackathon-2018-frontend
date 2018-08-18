<template>
    <div class="user">
        <header>
        </header>
        <h1>hackage</h1>
        <img src="https://yt3.ggpht.com/a-/ACSszfHx5NjkvUKI-erg6MSo3-MeZgEWOZgFTK8orQ=s900-mo-c-c0xffffffff-rj-k-no">
        <div class="profile">
            <p>お名前</p>
            <input type="text" v-model="name" placeholder="石巻太郎">
            <p>あだ名</p>
            <input type="text" v-model="nickname" placeholder="ハック">
            <p>やりたい役割</p>
            <input type="text" v-model="role" placeholder="プログラマ">
            <p>スキル</p>
            <input type="text" v-model="skill" placeholder="Java, Kotlin, Python, Processing, Swift">
            <p>所属</p>
            <input type="text" v-model="organization" placeholder="GDG石巻">
            <p>参加したきっかけ</p>
            <textarea v-model="purpose" rows="2" placeholder="いろいろなエンジニアの方と開発を行って刺激をうけにきました。"/>
            <p>その他</p>
            <textarea v-model="none" rows="2" placeholder="石巻ハッカソンに毎年参加してます。Android大好きです"/>
            <p>アイデア名</p>
            <input type="text" v-model="todomodelname" placeholder="Hackage(ハッケージ)">
            <p>アイデア概要</p>
            <textarea v-model="todomodelname" rows="2" placeholder="ハッピー+ハッカソン+パッケージでハッカソンをハック"/>
            <p>想定している技術</p>
            <input type="text" v-model="todomodelname" placeholder="Vue.js, Firebase">
            <!-- <p>アイディアの有無</p>
            <label><input type="radio" v-model="radio" value="Yes">ある</label>
            <label><input type="radio" v-model="radio" value="No">ない</label>
            <p>{{radio}}</p> -->
        </div>
        <md-button class="md-raised save" @click="join">保存</md-button>
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
    background-color: #52B574;
  }
  h1{
      color:#52B574;
  }
  span{
      border-bottom: solid 0.3rem #52B574;
  }
  img{
    height: 2rem;
  }
  p{
      color:#52B574;
      padding-left: 0;
          margin-bottom: 30px;
  }
  .md-button{
      background-color:#52B574;
      color: white;
      border-radius: 1rem;
  }
  input[type="text"], textarea{
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 2px solid #52B574;
    width: 60%;
    font-size: 20px;
    text-align: center;
  }

  textarea{
    font-size: 16px;
  }

  .save{
      margin-top: 40px;
  }
  
</style>
