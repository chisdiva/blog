<template>
  <div id="show-article">
    <nav-bar></nav-bar>
    <div class="title">
      <h1>{{title}}</h1>
    </div>
    <v-md-editor :value="content" mode="preview" style="width: 60%"></v-md-editor>
    <comment class="comment" :comments="this.comments" :category="this.$route.params.category"
              @newComment="newComment"></comment>
  </div>
</template>

<script>
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import NavBar from "@/components/NavBar";
import Comment from "@/components/comment";
export default {
name: "ShowArticle",
  components: {Comment, NavBar},
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
      this.$axios.post(`${this.$route.params.category}/${this.$route.params.id}`, {
        id: this.$route.params.id,
        title: this.title,
        content: this.content,
        comments: this.comments
      })
    }
  },
  mounted() {
    this.$axios.get(`${this.$route.params.category}/${this.$route.params.id}`).then(res => {
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