<template>
  <div id="home">
    <nav-bar></nav-bar>
    <show-item :blog-data="content" :category="this.category"></show-item>
    <introduction class="intro"></introduction>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ShowItem from "@/components/ShowItem";
import Introduction from "@/components/Introduction";
export default {
  name: "Home",
  components: {Introduction, ShowItem, NavBar},
  data() {
    return {
      category: '',
      content: []
    }
  },
  methods: {
    getData(category) {
      this.$axios.get(`http://localhost:7866/${category}`).then((res) => {
        this.content = res.data;
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