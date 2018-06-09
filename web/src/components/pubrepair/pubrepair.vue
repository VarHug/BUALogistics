<template>
  <transition name="move">
    <div class="pub-repair" v-show="showFlag">
      <div class="back" @click="hide">
        <i class="icon-arrow_lift"></i>
      </div>
      <h1 class="title">编辑“后勤报修”相关信息</h1>
      <div class="edit_user_parsing">
        <h2 class="repairdesc">报修情况</h2>
        <div class="paste">
          <textarea v-model="message" rows="3" placeholder="例：黑色小U盘，和数据线插在一起，是在南门到5号楼宿舍丢的 捡到的话万分感谢，请联系我XXXXXXXXXXX，谢谢"></textarea>
          <span class="clear-content" @click="clearMessage">清空内容</span>
        </div>
      </div>
      <div class="pub-btn" @click="pubConfirm">确认</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
// import {eventHub} from '../../common/js/eventHub.js';

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      message: ''
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    clearMessage() {
      this.message = '';
    },
    pubConfirm() {
      let repairObj = {};
      if (this.message) {
        repairObj['author'] = this.user.userName;
        repairObj['content'] = this.message;
        repairObj['time'] = new Date().getTime();
        repairObj['replay'] = '';
        repairObj['state'] = 0;
        repairObj['userId'] = this.user._id;
      }
      console.log(repairObj);
      // this.$axios.post('/api/repair', {
      //   params: repairObj
      // }).then(response => {
      //   console.log(response);
      // });
      this.$emit('pubrepair', repairObj);

      this.$axios.all([this._postRepair(repairObj), this._postUser(repairObj)]);

      this.showFlag = false;
    },
    _postRepair(obj) {
      return this.$axios.post('/api/repair', {
        params: obj
      });
    },
    _postUser(obj) {
      return this.$axios.post('/api/user', {
        params: obj
      });
    }
  },
  components: {

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.pub-repair
  position fixed
  top 0
  left 0
  bottom 0
  width 100%
  z-index 100
  background-color #fff
  transform translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .back
    position absolute
    top 10px
    left 0
    .icon-arrow_lift
      padding 10px
  .title
    line-height 35px
    height 35px
    font-size 15px
    text-align center
    border-bottom 1px solid #e6e6e6
  .edit_user_parsing
    margin-top 10px
    padding 0 10px
    color #a7a7a7
    .repairdesc
      font-size 14px
      margin-bottom 10px
    .paste
      position relative
      padding 10px 10px 20px
      border 1px solid #e6e6e6
      border-radius 2px
      textarea
        resize none
        width 100%
        outline none
        border none
        font-size 12px
        &::placeholder
          color #a7a7a7
      .clear-content
        position absolute
        right 5px
        bottom 5px
        font-size 14px
        color #3b95fa
  .pub-btn
    position absolute
    bottom 0
    width 100%
    height 42px
    line-height 42px
    text-align center
    font-size 15px
    color #ffffff
    background #3b95fa

</style>
