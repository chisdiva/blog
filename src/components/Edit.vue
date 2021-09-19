<template>
  <div id="edit">
    <el-input
        type="text"
        size="medium"
        placeholder="请输入标题"
        v-model="title"
        style="width: 400px;margin:20px;resize: none">
    </el-input>
    <el-button
        class="publish-btn"
        type="primary"
        icon="el-icon-edit"
        size="small"
        @click="publish"
        style="margin-left: 800px">
      发表文章</el-button>
    <v-md-editor
        v-model="text"
        height="400px"
        :disabled-menus="[]">
    </v-md-editor>
  </div>
</template>

<script>
import {format} from '@/common/util'
export default {
  name: "Edit",
  data() {
    return {
      title: '',
      text: '',
      isNew: false,
      category: ''
    }
  },
  computed: {
    nowDate: function () {
      return format("mm-dd", new Date());
    }
  },
  methods: {
    publish() {
      if(!this.isNew) {
        this.$axios.post(`${this.category}/${this.$route.params.id}`, {
          id: this.$route.params.id,
          title: this.title,
          content: this.text,
          date: this.nowDate
        }).then(() => {
          this.$router.push("/manager");
        })
      } else {
        this.$axios.post(`${this.category}/new`, {
          title: this.title,
          content: this.text,
          date: this.nowDate
        }).then(() => {
          console.log(this.$router)
          this.$router.push("/manager");
        })
      }
    }
  },
  created() {
    this.category = this.$route.params.category;
    if(this.$route.params.id !== 'new') {
      //如果id不为new，则标志位置为假，即为编辑修改功能
      this.isNew = false;
    }
  },
  mounted() {
    if(!this.isNew) {
      //如果标志位为假，则根据id获取文章标题内容
      this.$axios.get(`${this.category}/${this.$route.params.id}`).then(res => {
        this.title = res.data.title;
        this.text = res.data.content;
      })
    }
  }
}
</script>

<style scoped>

</style>