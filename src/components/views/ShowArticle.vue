<template>
  <div id="show-article">
    <nav-bar></nav-bar>
    <div class="title">
      <h1>{{title}}</h1>
    </div>
    <v-md-editor :value="content" mode="preview" style="width: 60%" :include-level="[3, 4]" :toc-nav-position-right="true"></v-md-editor>
    <comment class="comment" :comments="this.comments" :category="this.$route.params.category"
              @newComment="newComment"></comment>
    <back-top class="backTop" :is-scroll="isScroll" @click.native="backTopClick('show-article')"></back-top>
  </div>
</template>

<script>
import {myScroll} from "@/common/mixin";
import NavBar from "@/components/NavBar";
import Comment from "@/components/comment";
import BackTop from "@/components/BackTop";
import {request} from "@/network/request"
export default {
name: "ShowArticle",
  components: {Comment, NavBar, BackTop},
  mixins:[myScroll],
  data() {
    return {
      html: '',
      title: '',
      data: {},
      comments: [],
    }
  },
  methods: {
    newComment(comment) {
      this.comments.push(comment);
      request({
        url: `/${this.$route.params.category}/${this.$route.params.id}`,
        method: "POST",
        data:{
        id: this.$route.params.id,
        title: this.title,
        content: this.content,
        comments: this.comments
        }
      })
    }
  },
  mounted() {
    request(`/${this.$route.params.category}/${this.$route.params.id}`).then(res => {
      this.title = res.data.title;
      this.content = res.data.content;
      this.date = res.data.date;
      this.comments = res.data.comments;
    })
  }
}
</script>

<style scoped>
  #show-article {
    /*display: inline-block;*/
    position: relative;
  }
  .title {
    padding-left: 40px;
    width: 700px;
  }
  .comment {
    position: absolute;
    right:40px;
    top: 110px;
  }
</style>