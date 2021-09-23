<template>
  <div id="nav-bar">
    <div class="logo" @click="toIndex">
      ChisDiva
    </div>
    <div class="link-wrap">
      <router-link  to="/blog" >文章</router-link>
      <router-link  to="/essay">杂谈</router-link>
      <router-link  to="/collect">收藏</router-link>
      <router-link  to="/manager">管理</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    toIndex(){
      this.$router.push({path:'/'})
    },
  }
}
</script>

<style scoped>
#nav-bar {
  border-bottom:solid rgb(228, 228, 228) 0.5px;
  position: relative;
  padding-bottom: 1px;
  margin-right: 80px;
  height: 80px;
}

.logo {
  margin-left: 40px;
  width: 80px;
  position: absolute;
  bottom: 2px;
  color: #338db7;
  font-size: 40px;
  font-weight: 900;
  text-shadow: 1px -2px 2px blueviolet;
  cursor: pointer;
}


.link-wrap {
  font-size: 18px;
  width: 400px;

  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: space-around;
}
.link-wrap a {
  color: #9acbfd;
  padding-bottom: 7px;

}
/*router-link-active是激活时的默认类名*/
.link-wrap .router-link-active {
  color: #269df0;
  border-bottom:solid #269df0 2px;
}
.link-wrap a:hover {
  color: #269df0;
}
</style>