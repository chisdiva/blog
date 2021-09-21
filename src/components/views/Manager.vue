<template>
  <div id="manager">
    <nav-bar></nav-bar>
    <div class="manager-content">
      <side-bar :categories="categories" class="sidebar" @sideBarClick="sideBarClick"></side-bar>
      <div class="manager-table">
        <el-table
            :data="((content.filter(data=>!sear||data.title.toLowerCase().includes(sear.toLowerCase()))
              .slice((currentPage-1)*pageSize,currentPage*pageSize)))"
            style="width: 100%"
            :header-row-style="{height:'10px'}"
            :key="Math.random()">
          <el-table-column
              label="日期"
              prop="date"
              width="200px">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>&nbsp;&nbsp;&nbsp;{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="标题"
              prop="title">
          </el-table-column>
          <el-table-column
              align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                  v-model="sear"
                  size="mini"
                  type="text"
                  placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            class="pagination"
            :hide-on-single-page="hideOnSinglePage"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalSize">
        </el-pagination>
        <el-button
            class="manager-new"
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="newBlog">
          新建文章
        </el-button>
      </div>

    </div>
    <el-dialog title="添加收藏" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="文章名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章链接" :label-width="formLabelWidth">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newCollect">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import Pagination from "@/components/Pagination";
import NavBar from "@/components/NavBar";
import {format} from "@/common/util";
//表格只在Manager中使用，所以在这里引入
import {Table, TableColumn} from "element-ui"

export default {
  name: "Manager",
  components: {NavBar, SideBar, Pagination, "el-table": Table, "el-table-column": TableColumn},

  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        link: ''
      },
      isNewCollect: false,
      formLabelWidth: '120px',
      hideOnSinglePage: true,
      currentPage: 1,
      categories: ["文章", "杂谈", "收藏"],
      currentIndex: 0,
      kind: ["blog", "essay", "collect"],
      content: [],
      sear: '',
      pageSize: 5,
    }
  },
  computed: {
    totalSize: function () {
      return this.content.length
    },
    nowDate: function () {
      return format("mm-dd", new Date());
    }
  },
  methods: {
    sideBarClick(index) {
      this.currentIndex = index;
      this.getData(this.kind[this.currentIndex])
    },
    getData(category) {
      this.$axios.get(`${category}`).then((res) => {
        this.content = res.data;
        if(res.headers.code === '2') {
          this.$router.replace('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleEdit(index, row) {
      if (this.kind[this.currentIndex] === 'collect') {
        this.dialogFormVisible = true;
        this.isNewCollect = false;
        this.form.id = row._id;
        this.$axios.get(`${this.kind[this.currentIndex]}/${this.form.id}`).then(res => {
          this.form.name = res.data.title;
          this.form.link = res.data.link;
        })
      } else {
        this.$router.push({
          name: "edit",
          params: {
            category: this.kind[this.currentIndex],
            id: row._id
          }
        })
      }
    },
    handleDelete(index, row) {
      this.content.splice(index, 1);
      this.$axios.delete(`${this.kind[this.currentIndex]}/${row._id}`);
    },
    newBlog() {
      if (this.kind[this.currentIndex] === 'collect') {
        this.dialogFormVisible = true;
        this.isNewCollect = true;

      } else {
        this.$router.push({
          name: "edit",
          params: {
            category: this.kind[this.currentIndex],
            id: 'new'
          }
        })
      }
    },

    newCollect() {
      this.dialogFormVisible = false;
      //新建收藏
      if (this.isNewCollect) {
        this.$axios.post(`${this.kind[this.currentIndex]}/new`, {
          title: this.form.name,
          link: this.form.link,
          date: this.nowDate
        }).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      }
      //编辑收藏
      else {
        this.$axios.post(`${this.kind[this.currentIndex]}/${this.form._id}`, {
          id: this.form._id,
          title: this.form.name,
          link: this.form.link,
          date: this.nowDate
        }).then(() => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        })
      }
      this.content.splice(1,0)
      this.form._id = '';
      this.form.name = '';
      this.form.link = '';
    }
  },
  created() {
    this.getData('blog');
  },

  //路由进入前判断token
  beforeRouteEnter(to, from, next) {
    let token = localStorage.getItem('token')
    if(token === null || token === '') {
      next('/login')
    }
    else {
      next()
    }
  }
}
</script>

<style scoped>
.logo {
  padding-left: 40px;
}

.logo img {
  width: 80px;
  height: 80px;
}

/*两栏布局 左侧固定宽度 右侧自适应*/
.manager-content {
  display: flex;
}

.sidebar {
  width: 180px;
  flex: 0 0 180px;
}

.manager-table {
  flex: 1;
  padding: 10px 20px;
  height: 100%;
}

.manager-table .el-table {
  min-height: 350px;
  height: 350px;
}

.pagination {
  margin-left: 300px;
  display: inline-block;
}

.manager-new {
  float: right;
  margin-right: 50px;
}


</style>