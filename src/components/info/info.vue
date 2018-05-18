<template>
  <div>
    <div class="info">
      <div class="header">
        <h3 class="title">通知/NOTICE</h3>
        <p class="text">适合发送各种形式的公文、消息、公告和启事</p>
        <p class="text">可针对校内/外、教职工/学生、指定部门进行区别发送</p>
      </div>
      <div class="content-wrapper" ref="contentWrapper">
        <ul>
          <li class="item" v-for="(item, index) in info" :key="index">
            <div class="item-logo">
              <img width="50px" height="50px" src="./pim.png">
            </div>
            <div class="item-main">
              <div class="title">{{item.title}}</div>
              <div class="releaseUnit">{{item.releaseUnit}}</div>
              <div class="releaseTime">{{item.releaseTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';

const ERR_OK = 0;

export default {
  props: {

  },
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
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      this.contentScroll = new BScroll(this.$refs.contentWrapper, {

      });
    }
  },
  components: {

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .info
    position absolute
    top 0
    bottom 50px
    width 100%
    overflow hidden
    .header
      .title
        margin-bottom 8px
        font-size 16px
      .text
        margin 4px 0
        font-size 10px
        color #999999
    .content-wrapper
      position absolute
      top 52px
      bottom 0
      overflow hidden
      .item
        display flex
        margin 10px 0
        .item-logo
          flex 0 0 50px
        .item-main
          flex 1
          margin-left 10px
          overflow hidden
          .title
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            font-size 15px
            color #666
          .releaseUnit
            margin 5px 0 3px 0
            font-size 10px
            color #666666
          .releaseTime
            font-size 10px
            color #999999
</style>
