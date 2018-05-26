<template>
  <div id="app">
    <keep-alive>
      <div class="router-wrapper">
        <router-view></router-view>
      </div>
    </keep-alive>
    <bua-footer class="footer"></bua-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import footer from './components/footer/footer';

// const ERR_OK = 0;

export default {
  data() {
    return {

    };
  },
  created() {

  },
  components: {
    'bua-footer': footer
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'

#app
  position relative
  width 100%
  height 100%
  .router-wrapper
    position absolute
    top 0
    bottom 50px
    width 100%
    overflow hidden
  .footer
    position fixed
    bottom 0
    transform translateZ(0)
</style>
