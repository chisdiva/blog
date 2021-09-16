<template>
  <div id="app" :style="backgroundImage" @click="clickBg">
    <router-view></router-view>
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
  }
}
</script>

<style>
@import "assets/css/base.css";
#app {
  background-position: 0 -60px;
}
</style>
