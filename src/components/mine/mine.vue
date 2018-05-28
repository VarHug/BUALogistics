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
          <li v-for="(find,index) in user.userFind" :key="index">
            <div class="find-desc">{{find.desc}}</div>
            <div class="find-state">{{getFindState(find.state)}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import split from '../split/split';

const ERR_OK = 0;
const STATE_LOSE = 0; // 寻找中
const STATE_FIND = 1; // 已找回
const STATE_DRAW = 2; // 招领中
const STATE_BACK = 3; // 已归还

export default {
  data() {
    return {
      user: []
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
    }
  },
  computed: {
    getFindText() {
      if (this.user.userFind && this.user.userFind.length !== 0) {
        return '您的“失物招领相关信息如下”';
      } else {
        return '您还未有“失物招领”的相关信息哦';
      }
    }
  },
  components: {
    split
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
        line-height 14px
        font-size 14px
</style>
