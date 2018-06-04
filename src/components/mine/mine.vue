<template>
  <div class="mine" ref="mine">
    <div class="mine-wrapper">
      <div class="user">
        <div class="avatar">
          <img width="50" height="50" src="./gabe.jpg">
        </div>
        <div class="user-detail">
          <span class="user-name">Gabe Newell</span>
          <span class="user-type">学生</span>
          <span class="user-id">19621103</span>
        </div>
      </div>
      <split></split>
      <div class="find-lose">
        <h1 class="title">{{getFindText}}</h1>
        <ul v-show="user.userFind && user.userFind.length !== 0">
          <li class="find-item" v-for="(find,index) in user.userFind" :key="index">
            <span class="find-state" :class="{'gray': find.state === 1 || find.state === 3}" @click="findStateClick(find)">{{getFindState(find.state)}}</span>
            <p class="find-desc">{{find.desc}}</p>
          </li>
        </ul>
        <div class="publish">
          <div class="publish-box">
            <img width="125" height="111" src="./role-3.png">
            <span class="publish-title">丢了东西，点我寻找</span>
          </div>
          <div class="publish-box">
            <img width="125" height="111" src="./role-4.png">
            <span class="publish-title">捡到东西，点我归还</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="repair-info">
        <h1 class="title">{{getRepairText}}</h1>
        <ul class="repair-content" v-show="user.userRepair && user.userRepair.length !== 0">
          <li class="repair-item" v-for="(repair,index) in user.userRepair" :key="index">
            <p class="consult-text">咨询内容：{{repair.content}}</p>
            <p class="reply-text">部门回复：{{repair.reply}}</p>
          </li>
        </ul>
      </div>
      <cube-button @click="showPicker">失物招领</cube-button>
      <v-confirm :message="'您确定物品已经找回了么'" :show="confirmShow" @cancel="confirmCancel" @confirm="confirmSure"></v-confirm>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import split from '../split/split';
import confirm from '../confirm/confirm';
import BScroll from 'better-scroll';
import {stateList, typeList, objectList} from '../../common/js/lostProperty.js';

const ERR_OK = 0;
const STATE_LOSE = 0; // 寻找中
const STATE_FIND = 1; // 已找回
const STATE_DRAW = 2; // 招领中
const STATE_BACK = 3; // 已归还
const lostPropertyData = stateList;
lostPropertyData.forEach((state) => {
  state.children = typeList;
  state.children.forEach((type) => {
    type.children = objectList[type.value];
  });
});

export default {
  mounted() {
    this.lostPropertyPicker = this.$createCascadePicker({
      title: '失物招领',
      data: lostPropertyData,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    });
  },
  data() {
    return {
      user: [],
      findConfirmTxt: '',
      confirmShow: false,
      curFind: {}
    };
  },
  created() {
    this.$axios.get('/api/user').then(response => {
      if (response.data.errno === ERR_OK) {
        this.user = response.data.data;
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.mine, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    getFindState(state) {
      if (state === STATE_LOSE) {
        return '寻找中';
      } else if (state === STATE_FIND) {
        return '已找回';
      } else if (state === STATE_DRAW) {
        return '招领中';
      } else if (state === STATE_BACK) {
        return '已归还';
      }
    },
    findStateClick(find) {
      if (find.state === STATE_LOSE) {
        this.findConfirmTxt = '您确定物品已经找回了么';
      } else if (find.state === STATE_DRAW) {
        this.findConfirmTxt = '您确定物品已经归还了么';
      } else {
        return;
      }
      this.curFind = find;
      this.confirmShow = true;
    },
    confirmCancel() {
      this.confirmShow = false;
    },
    confirmSure() {
      this.curFind.state++;
      this.confirmShow = false;
    },
    showPicker () {
      this.lostPropertyPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.$createDialog({
        type: 'warn',
        content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
        icon: 'cubeic-alert'
      }).show();
    },
    cancelHandle() {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show();
    }
  },
  computed: {
    getFindText() {
      if (this.user.userFind && this.user.userFind.length !== 0) {
        return '您的“失物招领”相关信息如下';
      } else {
        return '您还未有“失物招领”的相关信息哦';
      }
    },
    getRepairText() {
      if (this.user.userRepair && this.user.userRepair.length !== 0) {
        return '您的“后勤报修”相关信息如下';
      } else {
        return '您还未有“后勤报修”的相关信息哦';
      }
    }
  },
  components: {
    split,
    'v-confirm': confirm
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mine
  position absolute
  top 0
  left 0
  bottom 0
  width 100%
  .user
    display flex
    padding 15px
    font-size 0
    .avatar
      flex 0 0 50px
      width 50px
    .user-detail
      margin-left 5px
      .user-name, .user-type, .user-id
        display block
      .user-name
        margin-bottom 3px
        line-height 18px
        font-size 16px
        font-weight 700
      .user-type
        margin-bottom 4px
        line-height 12px
        font-size 12px
      .user-id
        line-height 12px
        font-size 10px
  .find-lose
    padding 18px
    .title
      margin-bottom 14px
      line-height 14px
      font-size 14px
      color #07111b
    .find-item
      display flex
      margin-bottom 10px
      padding 0 12px
      .find-state
        flex 0 0 60px
        box-sizing border-box
        display inline-block
        vertical-align top
        margin-right 10px
        width 60px
        height 30px
        padding 8px 12px
        font-size 12px
        color #ffffff
        border-radius 1px
        background-color #00a0dc
        &.gray
          background-color #4d555d
      .find-desc
        display inline-block
        vertical-align top
        line-height 16px
        font-size 12px
    .publish
      display flex
      .publish-box
        flex 1
        text-align center
        font-size 0
        img
          display inline-block
          vertical-align middle
        .publish-title
          display inline-block
          vertical-align middle
          padding 5px
          font-size 12px
          color #ffffff
          background-color #3abaf1
          border-radius 5px
  .repair-info
    padding 18px 18px 0
    .title
      margin-bottom 14px
      line-height 14px
      font-size 14px
      color #07111b
    .repair-content
      padding-left 12px
      .repair-item
        margin-bottom 10px
        padding 5px
        font-size 12px
        color #ffffff
        background-color #08aba6
        border-radius 5px
        &:nth-of-type(even)
          background-color #3abaf1
</style>
