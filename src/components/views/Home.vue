<template>
  <div id="home">
<!--    <nav-bar></nav-bar>-->
    <div class="home-wrap">
      <show-item class="item" :blog-data="content" :category="this.category" :current="this.current"></show-item>
      <introduction class="intro"></introduction>
    </div>
    <back-top class="backTop" :is-scroll="isScroll" @click.native="backTopClick('home')"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ShowItem from "@/components/ShowItem";
import Introduction from "@/components/Introduction";
import {myScroll} from "@/common/mixin";
import BackTop from "@/components/BackTop";
import {request} from "@/network/request"
export default {
  name: "Home",
  components: {BackTop, Introduction, ShowItem, NavBar},
  mixins: [myScroll],
  data() {
    return {
      category: '',
      content: [],
    }
  },
  methods: {
    getData(category) {
      // this.$axios.get(`${category}`).then((res) => {
      //   this.content = res.data.reverse()
      // }).catch((err) => {
      //   console.log(err)
      // })
      request(`/${category}`).then(res => {
        this.content = res.data.reverse()
      }).catch(err => {
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

  }
}
</script>

<style scoped>
  #home {
    position: relative;

  }
  .home-wrap {
    display: flex;
    justify-content: center;
  }
  .item {
    flex: 0 1 40%;
  }
  .intro {
    margin-top: 50px;
    /*position: absolute;*/
    /*top:108px;*/
    /*right: 120px;*/
  }

</style>