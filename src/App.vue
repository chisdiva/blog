<template>
  <div id="app" :style="backgroundImage" @click="clickBg">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Manager from "@/components/views/Manager";

export default {
  name: 'App',
  components: {
    Manager
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
#app {
  background-position: 0 -60px;
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
</style>
