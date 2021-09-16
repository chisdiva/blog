<template>
  <div class="side-bar">
    <!--  由于只有文字不同，样式相同，因此可以直接用props传入数据，而不用插槽-->
    <div v-for="(item, index) in categories" v-bind:key="item" class="side-bar-item" :class="{active: index === currentIndex}"
          @click="itemClick(index)">
    <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    categories: {
      type:Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('sideBarClick', index);
    }
  }
}
</script>

<style scoped>
  .side-bar {
    background-color: #f5f5f5;
    text-align: center;
    line-height: 48px;
    font-size: 22px;
    color: #338db7;
    padding: 48px 0;
    height: 600px;
  }

  .side-bar-item:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
  /*优先级更高*/
  .side-bar-item.active {
    background-color:#42bbca;
    color: white;
  }
</style>