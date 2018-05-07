<template>
  <div>
    <div class="info">
      <h1 class="title"></h1>
      <div class="releaseUnit"></div>
      <div class="author"></div>
      <div class="tel"></div>
      <div class="msg"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

const ERR_OK = 0;

export default {
  data() {
    return {
      info: {}
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

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
