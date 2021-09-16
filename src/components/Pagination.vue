<template>
  <div id="pagination">
      <el-pagination
          :hide-on-single-page="hideOnSinglePage"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalSize">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      hideOnSinglePage: false
    }
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type:Number,
      required: true
    },
    totalSize: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>


</style>