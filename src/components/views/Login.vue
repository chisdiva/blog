<template>
  <div id="login">
    <nav-bar></nav-bar>
    <el-dialog title="登陆" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" :show-close="false">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" >
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backToIndex">返回首页</el-button>
        <el-button type="primary" @click="submit">登 陆</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import {request} from "@/network/request"
export default {
name: "Login",
  components: {NavBar},
  data() {
    return {
      form: {
        userName: '',
        password: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: true,
    }
  },
  methods: {
    submit() {
      this.$axios.post('login', {
        userName: this.form.userName,
        password: this.form.password,
      }).then((response) => {
        if(response.data.status === 200) {
          this.$message({
            message: '登陆成功！',
            type: "success"
          })
          localStorage.setItem('token', response.data.token)
          this.$router.replace('/manager')
        }
        else {
          console.log(response.data.msg)
          this.$message({
            message: '账号名或密码错误！',
            type: "error"
          })
        }
      })
    },
    backToIndex() {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>