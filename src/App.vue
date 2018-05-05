<template>
  <div id="app">
    <router-view></router-view>
    <bua-footer class="footer"></bua-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import footer from './components/footer/footer';

export default {
  data() {
    return {

    };
  },
  components: {
    'bua-footer': footer
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'

  .footer
    position fixed
    bottom 0
    border-1px-top(rgba(7, 17, 27, 0.1))
</style>
