<template>
  <div id="container">
    <div class="flexbox nav-header">
      <div id="div-logo">
        <router-link tag="a" to="/">
          <img id="img-logo" src="./assets/Clear_Name.png" alt="">
        </router-link>
      </div>
      <div id="nav-drawer">
          <input id="nav-input" type="checkbox" class="nav-unshown">
          <label id="nav-open" for="nav-input"><span></span></label>
          <label class="nav-unshown" id="nav-close" for="nav-input"></label>
          <div id="nav-content">
            <router-link tag="a" to="/login">
              <p>login</p>
            </router-link>
            <router-link tag="a" to="/logout">
              <p>logout</p>
            </router-link>
            <router-link tag="a" to="/profile">
              <p>profile</p>
            </router-link>
            <router-link tag="a" to="/projects">
              <p>projects</p>
            </router-link>
          </div>
      </div>
    </div>

    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

export default class App extends Vue {
  created () {}

  home() {

  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;/*固定ヘッダーの高さ分下げる*/
}

.flexbox {
  padding:10px;
  background: #52B574;/*背景色*/
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: right;
  -webkit-align-items: stretch;
  align-items: center;
  flex-direction: row-reverse;
  text-align: center;
}

/*固定ヘッダー*/
.nav-header{
  position: fixed;
  width: 100%;
  z-index: 99999;
}

p {
  color: #B4B4B4;
  padding-left: 20px;
  font-size: 20px;
}

#div-logo {
  flex-grow: 5
}

#img-logo {
  height: 30px;
}

#nav-drawer {
  position: relative;
  width: 45px;
}

/*チェックボックス等は非表示に*/
.nav-unshown {
  display:none;
}

/*アイコンのスペース*/
#nav-open {
    display: inline-block;
    width: 30px;
    height: 22px;
    vertical-align: middle;
}

/*ハンバーガーアイコンをCSSだけで表現*/
#nav-open span, #nav-open span:before, #nav-open span:after {
    position: absolute;
    height: 3px;/*線の太さ*/
    width: 25px;/*長さ*/
    border-radius: 3px;
    background: #fff;
    display: block;
    content: '';
    cursor: pointer;
}
#nav-open span:before {
    bottom: -8px;
}
#nav-open span:after {
    bottom: -16px;
}

/*閉じる用の薄黒カバー*/
#nav-close {
    display: none;/*はじめは隠しておく*/
    position: fixed;
    z-index: 99;
    top: 0;/*全体に広がるように*/
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0;
    transition: .3s ease-in-out;
}

/*中身*/
#nav-content {
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;/*最前面に*/
    width: 90%;/*右側に隙間を作る*/
    max-width: 330px;/*最大幅*/
    height: 100%;
    background: white;/*背景色*/
    transition: .3s ease-in-out;/*滑らかに表示*/
    -webkit-transform: translateX(-105%);
    transform: translateX(-105%);/*左に隠しておく*/
}

/*チェックが入ったらもろもろ表示*/
#nav-input:checked ~ #nav-close {
    display: block;/*カバーを表示*/
    opacity: .5;
}

#nav-input:checked ~ #nav-content {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);/*中身を表示*/
    box-shadow: 6px 0 25px rgba(0,0,0,.15);
}
</style>
