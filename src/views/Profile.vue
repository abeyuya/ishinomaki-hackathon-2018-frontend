<template>

  <div v-if="user">
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
            その他 <span><textarea v-model="note"></textarea></span>
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
                必要な技術 <span><input v-model="need_skills"></span>
            </p>
        </div>
        <button @click="join">登録</button>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { firebase } from '../lib/firebase'
import User from '../model/user'

@Component
export default class Profile extends Vue {
  user: User | null = null
  db = firebase.firestore()

  protected name = '';
  protected user_id = '';
  protected photo_url = '';
  protected nickname = '';
  protected role = '';
  protected skill = '';
  protected organization = '';
  protected purpose = '';
  protected note = '';
  protected title = '';
  protected overview = '';
  protected need_skills = '';

  created () {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user = await User.findByUid(user.uid)
        this.user.uid = user.uid
        this.photo_url = user.photoURL
      } else {
        this.user = null
      }
    })
  }

  async join (): Promise<void> {
    if (this.user == null) {
        return
    }
    if (this.user.uid == undefined) {
        return alert('ログインしてください')
    }
    this.db.collection('users').doc(`${this.user.uid}`).set({
      name: this.name,
      photo_url: this.photo_url,
      nickname: this.nickname,
      role: this.role,
      skill: this.skill,
      organization: this.organization,
      purpose: this.purpose,
      note: this.note,
    })
    .then(function() {
        return alert("Document successfully written!");
    })
    .catch(function(error) {
        return alert(`Error writing document: \n${error}`);
    });
  }
}

</script>
