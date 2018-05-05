<template>
  <div class="tab">
    <div class="tab-item">
      <i class="icon-twitter icon"></i>
      <div class="text">消息</div>
    </div>
    <div class="tab-item">
      <i class="icon-bubbles2 icon"></i>
      <div class="text">话题</div>
    </div>
    <div class="tab-item">
      <i class="icon-hammer icon"></i>
      <div class="text">报修</div>
    </div>
    <div class="tab-item">
      <i class="icon-user-tie icon"></i>
      <div class="text">我的</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    };
  },
  components: {

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display flex
    width 100%
    height 50px
    background-color rgb(240, 248, 255)
    .tab-item
      flex 1
      text-align center
      .icon
        display block
        padding-top 10px
        line-height 15px
        height 15px
        font-size 15px
      .text
        line-height 25px
        height 25px
        font-size 12px
</style>
