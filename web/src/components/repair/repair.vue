<template>
  <div class="repair" ref="repair">
    <ul class="content">
      <li class="repair-item" v-for="(item, index) in repair" :key="index">
        <div class="consult">
          <i class="icon-tux"></i>
          <div class="consult-right">
            <p class="consult-text">咨询内容：{{item.content}}</p>
            <span class="consult-author">咨询人：{{item.author}}</span>
            <span class="consult-time">咨询时间：{{item.time | formatDate}}</span>
          </div>
        </div>
        <div class="reply">
          <i class="icon-finder"></i>
          <p class="reply-text">部门回复：{{item.reply}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';

const ERR_OK = 0;

export default {
  data() {
    return {
      repair: []
    };
  },
  created() {
    this.$axios.get('/api/repair').then(response => {
      if (response.data.status === ERR_OK) {
        this.repair = response.data.result.list;
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.repair, {

        });
      } else {
        this.scroll.refresh();
      }
    }
  },
  components: {

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin";

.repair
  position absolute
  top 0
  left 0
  bottom 50px
  .content
    .repair-item
      margin 0 10px
      padding 10px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .consult
        display flex
        padding 5px
        .icon-tux
          flex 0 0 15px
          width 15px
          font-size 15px
        .consult-right
          flex 1
          margin-left 10px
          font-size 0
          .consult-text
            margin-bottom 8px
            font-size 14px
            font-weight 400
            color #666
          .consult-author, .consult-time
            display inline-block
            vertical-align top
            font-size 14px
            color #999999
          .consult-author
            margin-right 10px
      .reply
        display flex
        margin-right 10px
        padding 5px
        background-color #ededed
        border 1px dashed #e2e2e2
        .icon-finder
          flex 0 0 15px
          margin-right 10px
          width 15px
          font-size 15px
        .reply-text
          flex 1
          font-size 14px
          color #999
</style>
