<template>
  <div class="mine">
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
      <!-- v-show="user.find" -->
      <div class="find-content">
        <h1 class="title">{{getFindText}}</h1>
        <ul v-show="user.userFind && user.userFind.length !== 0">
          <li class="find-item" v-for="(find,index) in user.userFind" :key="index">
            <span class="find-state" :class="{'gray': find.state === 1 || find.state === 3}" @click="findStateClick(find)">{{getFindState(find.state)}}</span>
            <p class="find-desc">{{find.desc}}</p>
          </li>
        </ul>
      </div>
    </div>
    <v-confirm :message="'您确定物品已经找回了么'" :show="confirmShow" @cancel="confirmCancel" @confirm="confirmSure"></v-confirm>
  </div>
</template>

<script type="text/ecmascript-6">
import split from '../split/split';
import confirm from '../confirm/confirm';

const ERR_OK = 0;
const STATE_LOSE = 0; // 寻找中
const STATE_FIND = 1; // 已找回
const STATE_DRAW = 2; // 招领中
const STATE_BACK = 3; // 已归还

export default {
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
      }
    });
  },
  methods: {
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
    }
  },
  computed: {
    getFindText() {
      if (this.user.userFind && this.user.userFind.length !== 0) {
        return '您的“失物招领”相关信息如下';
      } else {
        return '您还未有“失物招领”的相关信息哦';
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
  .user
    display flex
    .avatar
      flex 0 0 50px
      width 50px
    .user-detail
      .user-name, .user-type, .user-id
        display block
      .user-name
        line-height 18px
        font-size 16px
        font-weight 700
      .user-type
        line-height 12px
        font-size 12px
      .user-id
        line-height 12px
        font-size 10px
  .find-lose
    .find-content
      padding 18px 18px 0
      .title
        margin-bottom 8px
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
</style>
