<template>
  <transition name="fade">
    <div class="set-list-wrapper" v-show="showFlag" @click="hide">
      <div class="set-list">
        <div class="pullup">
          <i class="cubeic-pullup"></i>
        </div>
        <ul class="list-content">
          <li class="list-item" v-for="(item, index) in listData" :key="index">{{item.text}}</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    listData: {
      type: Array
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = !this.showFlag;
    },
    hide() {
      this.showFlag = false;
    }
  },
  components: {

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.set-list-wrapper
  position absolute
  top 0
  right 0
  bottom 0
  width 100%
  z-index 50
  &.fade-enter-active, &.fade-leave-active
    transition opacity .5s
  &.fade-enter, &.fade-leave-to
    opacity 0
  .set-list
    position absolute
    top 35px
    right 10px
    width 75px
    z-index 100
    .pullup
      position absolute
      top -10px
      right 0
      font-size 30px
      color rgba(7, 17, 27, 0.7)
    .list-content
      margin-top 7px
      text-align center
      color #ffffff
      background-color rgba(7, 17, 27, 0.7)
      .list-item
        line-height 25px
        font-size 10px
        height 25px
        border-bottom 1px solid #000
        &:last-child
          border none

</style>
