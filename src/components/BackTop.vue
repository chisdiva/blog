<template>
  <div id="back-top" :class="{active: isScroll}">
    <img src="@/assets/img/backTop.png" alt="">
  </div>
</template>

<script>
export default {
name: "BackTop",
  props: {
    isScroll: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
  .active {
  top: 0 !important;

  }
  #back-top {
  position: fixed;
  top: -600px;
  right: 1%;
  transition: all 0.5s ease-in-out 0s;
  transform: translateY(-30%);
  cursor: pointer;
}

</style>