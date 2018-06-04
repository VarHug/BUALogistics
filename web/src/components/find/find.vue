<template>
  <div class="find">
    <div class="header border-1px">
      <h3 class="title">失物招领/LOST&FOUND</h3>
      <p class="text">如果你丢了东西，你要第一时间来这里找；</p>
      <p class="text">如果你捡到了东西，在这里寻找失主。大家帮助大家！</p>
    </div>
    <div class="select-wrapper">
      <v-select :selectType="selectType" :type="0" :text="'寻找中'" @select="findSelect"></v-select>
      <v-select :selectType="selectType" :type="1" :text="'已找回'" @select="findSelect"></v-select>
      <v-select :selectType="selectType" :type="2" :text="'招领中'" @select="findSelect"></v-select>
      <v-select :selectType="selectType" :type="3" :text="'已归还'" @select="findSelect"></v-select>
    </div>
    <div class="content-wrapper" ref="contentWrapper">
      <ul class="content">
        <li class="content-item" v-for="(item, index) in find" :key="index" v-show="item.state===selectType">
          <div class="avatar">
            <img width="50" height="50" src="./avatar.gif">
          </div>
          <div class="content-right">
            <div class="title">
              <span class="name">{{item.name}}</span>
              <span class="text">{{getText}}</span>
              <span class="good">{{item.good}}</span>
            </div>
            <div class="desc">{{item.desc}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import select from '../select/select';

const STATE_LOSE = 0; // 寻找中
const STATE_FIND = 1; // 已找回
const ERR_OK = 0;

export default {
  data() {
    return {
      find: [],
      selectType: 0
    };
  },
  created() {
    this.$axios.get('/api/find').then(response => {
      if (response.data.errno === ERR_OK) {
        this.find = response.data.data;
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    });
  },
  computed: {
    getText() {
      if (this.selectType === STATE_LOSE || this.selectType === STATE_FIND) {
        return '丢了';
      } else {
        return '捡到';
      }
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.contentWrapper, {

        });
      } else {
        this.scroll.refresh();
      }
    },
    findSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  components: {
    'v-select': select
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin";

.find
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
  .select-wrapper
    padding 5px 0
    text-align center
    background-color #f3f5f7
  .content-wrapper
    position absolute
    top 103px
    bottom 0
    padding 0 18px
    overflow hidden
    background-color #f3f5f7
    .content-item
      display flex
      padding 15px 5px
      border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex 0 0 50px
        margin-right 15px
        width 50px
      .content-right
        flex 1
        .title
          font-size 0
          .name, .text, .good
            display inline-block
            vertical-align top
            line-height 18px
            color #4d555d
          .name, .text
            margin-right 8px
            font-size 14px
          .good
            font-size 14px
        .desc
          line-height 18px
          font-size 12px
          color #07111b
</style>
