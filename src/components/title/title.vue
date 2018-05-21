<template>
  <div class="v-title">
    <div class="line"></div>
    <div class="text">{{contentText}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    text: {
      type: String
    }
  },
  data() {
    return {
      contentText: this.text
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .v-title
    display flex
    .line
      flex 1
      position relative
      top -6px
      border-bottom 1px solid rgba(255, 255, 255, 0.2)
    .text
      padding 0 12px
      font-size 14px
      font-weight 700
</style>
