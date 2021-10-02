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
          v-for="item in sortedContent.filter(data=>!search||data.title.toLowerCase().includes(search.toLowerCase()))
                .slice((currentPage-1)*pageSize,currentPage*pageSize)"
          :key="item._id"
          @click="toBlog(item)">
      <span class="date">{{item.date}}</span>
      <span class="title">{{item.title}}</span>
    </div>
    <el-pagination
        class="pagination"
        :hide-on-single-page="hideOnSinglePage"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ShowItem",
  data() {
    return {
      search: '',
      hideOnSinglePage:true,
      currentPage: 1,
      pageSize: 5,

    }
  },
  props: {
    blogData: {
      type: Array
    },
    category: {
      type: String
    },
    current: {
      type: Number
    }
  },
  computed: {
    sortedContent: function() {
      return this.blogData.sort((a, b) => {
        if(a.date > b.date) {
          return -1
        } else if(a.date < b.date) {
          return 1
        } else {
          return 0;
        }
      })
    },

    totalSize: function () {
      return this.blogData.length
    },
  },
  methods: {
    toBlog(item) {
      if(this.$route.name === 'collect') {
        window.open(item.link)
      }
      else{
        this.$router.push(`/article/${this.category}/${item._id}`)
      }

    }
  }
}
</script>

<style scoped>
  @keyframes opc {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .tool-bar {
    color: #9acbfd;
    width: 520px;
    margin: 50px 200px 0 0px;
    padding: 0 10px 0px 10px;
    display: flex;
    justify-content: space-between;
  }
  .blog-list {
    animation: opc .6s;
    color: #269df0;
    width: 80%;
    height: 200px;
    background-color: #fff;
    /*animation: 0.7s ease-out 0s 1 normal forwards running cssnice;
    transition: all 0.5s ease 0s;*/
    margin: 0 0px 50px 0px;
    padding: 30px 30px 40px 100px;
    line-height: 1.5em;
    font-size: 18px;
    box-shadow: 5px 5px 20px rgb(228, 227, 227);
    border-left: solid 12px rgb(190, 220, 255);
    transition: transform 0.4s ease;
    cursor: pointer;
    position: relative;
  }

  .blog-list:hover {
    /*font-size: 22px;*/
    transform: scale(1.04,1.04);
    box-shadow: 5px 5px 20px rgb(228, 227, 227);
  }

  .blog-list .date {

    position: absolute;
    left: 20px;
  }
  .blog-list .title {
    /*padding-left: 40px;*/
  }
  .pagination {
    margin: 0 200px 50px 250px;
  }
</style>