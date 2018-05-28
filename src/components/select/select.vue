<template>
  <div class="block" :class="{'active':selectType===type}" @click="select(type)">{{text}}</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    selectType: {
      type: Number
    },
    type: {
      type: Number
    },
    text: {
      type: String
    }
  },
  data() {
    return {

    };
  },
  methods: {
    select(type) {
      this.$emit('select', type);
    }
  },
  components: {

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .block
    display inline-block
    padding 8px 12px
    margin-right 8px
    line-height 16px
    border-radius 3px
    font-size 12px
    color #4d555d
    background-color rgba(0, 160, 220, .2)
    &.active
      font-weight 400
      color #ffffff
      background-color #00a0dc
</style>
