<template>
  <div id="comment">
    <el-pagination
        style="display:inline-block;margin:10px 0 0 0;"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total="comments.length"
    ></el-pagination>
    <div class="comment-wrap" v-for="item in this.comments.slice((currentPage-1)*pageSize, currentPage*pageSize)"
         :key="item.date">
      <div class="radius">
        <img src="@/assets/img/head1.jpeg" alt="">
      </div>
      <span>{{ item.name }}<br></span>
      <p>{{ item.content }}</p>
    </div>
    <div>
      <el-input v-model="comment.name" placeholder="输入评论昵称" size='small'
                style='width:60%;margin:20px 0 10px 0'></el-input>
      <el-input v-model="comment.content" placeholder="输入评论内容" size='small'
                style='width:100%;margin-bottom:10px'></el-input>
      <el-button @click="pushComment" size='small'>提交评论</el-button>
    </div>
  </div>
</template>

<script>
import {format} from '@/common/util'

export default {
  name: "comment",
  data() {
    return {
      comment: {
        name: '',
        content: '',
        date: '',

      },
      currentPage: 1,
      pageSize: 10
    }
  },
  props: {
    comments: {
      type:Array
    },
    category: {
      type: String
    },
  },
  computed: {
    nowDate: function () {
      return format("YYYY-mm-dd", new Date());
    }
  },
  methods: {
    pushComment() {
      if (this.comment.name && this.comment.content) {
        const comment = {
          name: this.comment.name,
          content: this.comment.content,
          date: this.nowDate
        }
        this.$emit('newComment', comment)
        this.comment.name=''
        this.comment.content=''
      }
    }
  }
}
</script>

<style scoped>
.comment-wrap {
  position: relative;
  margin-top: 20px;

  box-shadow: 5px 5px 20px rgb(228, 227, 227);

  transition: 0.4s;
}

.radius {
  width: 80px;
  height: 80px;
  border: 1px solid transparent;
  border-radius: 40px;
  overflow: hidden;
  display: inline-block;
  vertical-align: top;
}

.radius img {
  width: 80px;
  height: 80px;
}

.comment-wrap span {
  color: #6d757a;
  font-size: 12px;
  position: absolute;
  top: 0px;
  left: 100px;
}

.comment-wrap p {
  font-size: 14px;
  color: #222222;
  position: absolute;
  top: 30px;
  left: 100px;
}
</style>