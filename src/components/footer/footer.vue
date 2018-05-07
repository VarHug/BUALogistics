<template>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/info" class="router-item">
        <i class="icon-twitter icon"></i>
        <div class="text">通知</div>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link to="/topic" class="router-item">
        <i class="icon-bubbles2 icon"></i>
        <div class="text">话题</div>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link to="/repair" class="router-item">
        <i class="icon-hammer icon"></i>
        <div class="text">报修</div>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link to="/mine" class="router-item">
        <i class="icon-user-tie icon"></i>
        <div class="text">我的</div>
      </router-link>
    </div>
    <div class="background"></div>
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
    overflow hidden
    width 100%
    height 50px
    .tab-item
      flex 1
      text-align center
      .router-item
        display block
        color rgb(119, 136, 153)
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
        &.active
          color rgb(205, 50, 120)
          font-weight bold
          .icon
            transform scale(1.2) rotate(-360deg)
            transition .8s
    .background
      position fixed
      bottom 0
      z-index -1
      width 100%
      height 50px
      background-image url('./bgBUA.jpg')
      background-repeat no-repeat
      background-size cover
      filter blur(2px)
</style>
