<template>
  <div id="app">
    <router-view :info="info"></router-view>
    <bua-footer class="footer"></bua-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import footer from './components/footer/footer';

const ERR_OK = 0;

export default {
  data() {
    return {
      info: []
    };
  },
  created() {
    this.$axios.get('/api/info').then(response => {
      if (response.data.errno === ERR_OK) {
        this.info = response.data.data;
        console.log(this.info);
      }
    });
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
    transform translateZ(0)
    border-1px-top(rgba(7, 17, 27, 0.1))
</style>
