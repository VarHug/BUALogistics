<template>
  <div class="info">
    <div class="header border-1px">
      <h3 class="title">通知/NOTICE</h3>
      <p class="text">适合发送各种形式的公文、消息、公告和启事</p>
      <p class="text">可针对校内/外、教职工/学生、指定部门进行区别发送</p>
    </div>
    <div class="content-wrapper" ref="contentWrapper">
      <ul>
        <li class="item" v-for="(item, index) in info" :key="index">
          <div class="item-logo">
            <img width="30px" height="30px" src="./pim.png">
          </div>
          <div class="item-main border-1px">
            <div class="title">{{item.title}}</div>
            <div class="releaseUnit">{{item.releaseUnit}}</div>
            <div class="releaseTime">{{item.releaseTime | formatDate}}</div>
            <div class="icon-wrapper" @click="showDetail(item)">
              <i class="icon-arrow-right2 icon"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <div class="name-wrapper">
              <h1 class="name">{{selectedInfo.title}}</h1>
            </div>
            <div class="title-wrapper">
              <detail-title :text="'通知信息'"></detail-title>
            </div>
            <ul class="release">
              <li class="release-item">发布单位：{{selectedInfo.releaseUnit}}</li>
              <li class="release-item">发布时间：{{selectedInfo.releaseTime}}</li>
              <li class="release-item">发布人：{{selectedInfo.author}}</li>
              <li class="release-item">联系电话：{{selectedInfo.tel}}</li>
            </ul>
            <div class="title-wrapper">
              <detail-title :text="'通知内容'"></detail-title>
            </div>
            <div class="msg-wrapper">
              <div class="msg">{{selectedInfo.msg}}</div>
            </div>
          </div>
          <div class="detail-close" @click="hideDetail">
            <i class="icon-close"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import title from '../title/title';

const ERR_OK = 0;

export default {
  props: {

  },
  data() {
    return {
      info: [],
      detailShow: false,
      selectedInfo: {}
    };
  },
  created() {
    this.$axios.get('/api/info').then(response => {
      if (response.data.errno === ERR_OK) {
        this.info = response.data.data;
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      this.contentScroll = new BScroll(this.$refs.contentWrapper, {
        click: true
      });
    },
    showDetail(item) {
      this.detailShow = true;
      this.selectedInfo = item;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  components: {
    'detail-title': title
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .info
    .header
      padding-bottom 5px
      color #ffffff
      background-color #141d27
      border-1px(rgba(7, 17, 27, 0.1))
      .title
        margin-bottom 8px
        font-size 16px
      .text
        margin 4px 0
        font-size 10px
        color #999999
    .content-wrapper
      position absolute
      top 61px
      bottom 50px
      width 100%
      overflow hidden
      background-color #f3f5f7
      .item
        display flex
        margin 5px 0
        padding-bottom 5px
        .item-logo
          flex 0 0 30px
        .item-main
          position relative
          flex 1
          margin-left 10px
          padding 0 10px 5px 0
          overflow hidden
          border-1px-bottom(rgba(7, 17, 27, 0.1))
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
          .icon-wrapper
            position absolute
            right 10px
            bottom 5px
            padding 15px
            .icon
              font-size 10px
              color #00a0dc
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      color #ffffff
      background-color rgba(7,17,27,0.8)
      .detail-wrapper
        display flex
        flex-flow column
        width 100%
        min-height 100%
        .detail-main
          flex 1
          margin-top 60px
          .name-wrapper
            width 80%
            margin 0 auto
            text-align center
            .name
              display inline-block
              line-height 16px
              text-align left
              font-size 16px
              font-weight 400
          .title-wrapper
            width 80%
            margin 28px auto 24px auto
          .release
            width 80%
            margin 0 auto
            .release-item
              padding 0 12px
              line-height 16px
              font-size 12px
          .msg-wrapper
            width 80%
            margin 0 auto
            .msg
              padding 0 12px
              line-height 20px
              font-size 12px
        .detail-close
          width 32px
          height 32px
          margin 10px auto
          font-size 32px
      &.fade-enter-active, &.fade-leave-active
          transition: all 1s
      &.fade-enter, &.fade-leave-active
          opacity: 0
</style>
