<template>
  <div id="app" :style="backgroundImage" @click="clickBg">
    <nav-bar></nav-bar>
    <transition :name="transitionName">
      <keep-alive exclude="Login">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <user-login class="user-login"></user-login>
  </div>
</template>

<script>
import Manager from "@/components/views/Manager";
import NavBar from "@/components/NavBar";
import UserLogin from "@/components/UserLogin";
export default {
  name: 'App',
  components: {
    UserLogin,
    Manager,
    NavBar
  },
  data() {
    return {
      index: 1,
      transitionName: 'slide-right'
    }
  },
  computed: {
    backgroundImage: function () {
      return "background-image: url(" + require(`./assets/img/${this.index}.png`) + ")"
    }
  },
  methods: {
    clickBg() {
      this.index = (this.index) % 3 + 1
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    }
  },
}
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/normalize.css";
#app {
  background-position: 0 -60px;
  padding-top: 60px;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-6%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(6%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(6%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(6%, 0, 0);
}

.user-login {
  /*width: 100%;*/
  /*height: 100%;*/
  /*position: absolute;*/
}
.el-dialog, .el-pager li {
  background-color: rgba(0,0,0,.3) !important;
}
.el-input-group__append {
  background-color: #409EFF!important;
  color: #fff!important;
}
</style>
