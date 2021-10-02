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
        type="danger"
        icon="el-icon-delete"
        size="small"
        @click="back"
        style="margin-left: 40%">
      返 回</el-button>
    <el-button
        class="publish-btn"
        type="primary"
        icon="el-icon-edit"
        size="small"
        @click="publish"
        style="margin-left: 2%">
      发表文章</el-button>
    <v-md-editor
        v-model="text"
        height="400px"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
        :include-level="[3, 4]">
    </v-md-editor>

  </div>
</template>

<script>
import {format} from '@/common/util'
import {request} from "@/network/request"

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
      return format("YYYY-mm-dd", new Date());
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
          //date: '07-05'
        }).then(() => {
          this.$router.push("/manager");
        })
      } else {
        this.$axios.post(`${this.category}/new`, {
          title: this.title,
          content: this.text,
          date: this.nowDate
          //date: '07-05'
        }).then(() => {
          console.log(this.$router)
          this.$router.push("/manager");
        })
      }
    },
    back() {
      this.$router.back()
    },
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      let formData = new FormData()
      formData.append('file', files[0])

      let imageUrl = '';
      this.$axios.post("upload",formData).then(res=>{
        imageUrl = res.data[0].path
        imageUrl = `http://110.42.141.74:7866/${imageUrl}`
        insertImage({
          url: imageUrl,
          desc: '插入图片',
          // width: 'auto',
          // height: 'auto',
        });
      });

    },
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