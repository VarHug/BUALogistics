<template>
  <div class="confirm-wrapper" v-show="show">
    <div class="confirm">
      <h1 class="title">操作提示</h1>
      <div class="mes">{{message}}</div>
      <div class="block-wrapper">
        <span class="cancel" @click="blockCancel">取消</span>
        <span class="sure" @click="blockConfirm">确定</span>
      </div>
      <i class="icon-close" @click="blockCancel"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    message: {
      type: String
    },
    show: {
      type: Boolean
    }
  },
  data() {
    return {

    };
  },
  methods: {
    blockCancel() {
      this.$emit('cancel');
    },
    blockConfirm() {
      this.$emit('confirm');
    }
  },
  components: {

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.confirm-wrapper
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(7,17,27,0.4)
  .confirm
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    padding 10px 0
    width 250px
    background-color #fff
    border-radius 5px
    .title
      margin 0 0 10px 10px
      line-height 18px
      font-size 16px
      color #666
    .mes
      margin-bottom 10px
      padding 8px 0
      text-align center
      border-top 1px solid rgba(7, 17, 27, 0.1)
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .block-wrapper
      text-align center
      font-size 0
      .cancel, .sure
        display inline-block
        padding 8px
        font-size 13px
        border 1px solid rgba(7, 17, 27, 0.1)
        border-radius 5px
      .sure
        margin-left 15px
        background-color rgba(0,160,220,.2)
        color #4d555d
    .icon-close
      position absolute
      top 5px
      right 5px
      padding 3px
      font-weight 700
      color #999
</style>
