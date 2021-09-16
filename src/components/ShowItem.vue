<template>
  <div id="show-item">
    <div class="tool-bar">
      <span>共{{this.blogData.length}}篇文章</span>
      <el-input
          v-model="search"
          style="width: 160px"
          size="mini"
          type="text"
          placeholder="输入关键字搜索"/>
    </div>
    <div class="blog-list"
          v-for="item in this.blogData"
          :key="item._id"
          @click="toBlog(item._id)">
      <span class="date">{{item.date}}</span>
      <span class="title">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowItem",
  data() {
    return {
      search: '',
    }
  },
  props: {
    blogData: {
      type: Array
    },
    category: {
      type: String
    }
  },
  methods: {
    toBlog(id) {
      this.$router.push(`/article/${this.category}/${id}`)
    }
  }
}
</script>

<style scoped>
  .tool-bar {
    color: #9acbfd;
    width: 520px;
    margin: 50px 200px 0 200px;
    padding: 0 10px 0px 10px;
    display: flex;
    justify-content: space-between;
  }
  .blog-list {
    color: #269df0;

    width: 520px;
    height: 120px;

    background-color: #fff;
    /*animation: 0.7s ease-out 0s 1 normal forwards running cssnice;
    transition: all 0.5s ease 0s;*/
    margin: 0 200px 50px 200px;
    padding: 30px 30px 40px 100px;

    line-height: 1.5em;
    font-size: 18px;
    box-shadow: 5px 5px 20px rgb(228, 227, 227);
    border-left: solid 12px rgb(190, 220, 255);
    transition: 0.4s;

    cursor: pointer;

    position: relative;
  }
  .blog-list span {

  }
  .blog-list .date {

    position: absolute;
    left: 20px;
  }
  .blog-list .title {
    /*padding-left: 40px;*/
  }
</style>