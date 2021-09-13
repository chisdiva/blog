<template>
  <div id="manager">
    <div class="logo">
      <img src="../assets/img/logo.jpg" alt="">
    </div>
    <div class="manager-content">
    <side-bar :categories="categories" class="sidebar" @sideBarClick="sideBarClick"></side-bar>
    <div class="manager-table">
      <el-table
          :data="tableData.filter(data => !sear || data.name.toLowerCase().includes(sear.toLowerCase()))"
          style="width: 100%">
        <el-table-column
            label="Date"
            prop="date">
        </el-table-column>
        <el-table-column
            label="Name"
            prop="name">
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
export default {
  name: "Manager",
  components: {SideBar},
  data(){
    return {
      categories: ["文章", "收藏"],
      content: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      sear: ''
    }
  },
  methods: {
    sideBarClick() {

    },
    getData(category) {
      this.$axios.get(`http://localhost:7866/${category}`).then((res) => {
        this.content = res.data;
      }).catch((err) => {
        console.log(err)
      })
    },
    changeSearch() {
      console.log('1');
      this.$forceUpdate();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
    this.getData('blog');
  }
}
</script>

<style scoped>
  .logo {
    padding-left: 20px;
  }
  .logo img{
    width: 80px;
    height: 80px;
  }
  .manager-content {
    display: flex;
  }
  .sidebar {
    flex-shrink: 0;
    flex-grow: 0;
  }
  .manager-table {
    flex-shrink: 1;
    flex-grow: 1;
    padding: 10px 20px;
  }
  
</style>