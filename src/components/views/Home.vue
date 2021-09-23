<template>
  <div id="home">
    <nav-bar></nav-bar>
    <show-item :blog-data="content" :category="this.category" :current="this.current"></show-item>
    <introduction class="intro"></introduction>
    <back-top class="backTop" :is-scroll="isScroll" @click.native="backTopClick('home')"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ShowItem from "@/components/ShowItem";
import Introduction from "@/components/Introduction";
import {myScroll} from "@/common/mixin";
import BackTop from "@/components/BackTop";
export default {
  name: "Home",
  components: {BackTop, Introduction, ShowItem, NavBar},
  mixins: [myScroll],
  data() {
    return {
      category: '',
      content: [],
      current: 0,

    }
  },
  methods: {
    getData(category) {
      this.$axios.get(`${category}`).then((res) => {
        this.content = res.data.reverse()
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  created() {
    this.category = this.$route.name;
    this.getData(this.category);
  },
  watch: {
    $route(to, from) {
      this.category = to.name;
      this.getData(this.category)
    },
    isBottom: function () {
      if (this.isBottom) {
        this.current++;
        this.isBottom = false;
      }
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
  }
  .intro {
    position: absolute;
    top:108px;
    right: 120px;
  }

</style>