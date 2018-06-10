<template>
  <div class="mine" ref="mine">
     <!-- v-show="login" -->
    <div class="mine-wrapper">
      <div class="setting" @click="setListShow">
        <i class="cubeic-setting"></i>
      </div>
      <div class="user">
        <div class="avatar">
          <img width="50" height="50" src="./gabe.jpg">
        </div>
        <div class="user-detail">
          <span class="user-name">{{user.userName}}</span>
          <span class="user-type">{{user.userType}}</span>
          <span class="user-id">{{user.userId}}</span>
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
        <div class="publish" @click="releaseFindShow">
          <i class="icon-add_circle"></i>
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
        <div class="publish" @click="pubRepairShow">
          <i class="icon-add_circle"></i>
        </div>
      </div>
      <!-- <cube-button @click="showPicker">失物招领</cube-button> -->
    </div>
    <v-confirm :message="'您确定物品已经找回了么'" :show="confirmShow" @cancel="confirmCancel" @confirm="confirmSure"></v-confirm>
    <pub-find :user="user" ref="releaseFind" @pubfind="addUserFind"></pub-find>
    <pub-repair :user="user" ref="pubRepair" @pubrepair="addUserRepair"></pub-repair>
    <!-- <login v-show="!login" @userlogin="userlogin"></login> -->
    <set-list :list-data="setListData" ref="setList"></set-list>
  </div>
</template>

<script type="text/ecmascript-6">
import split from '../split/split';
import confirm from '../confirm/confirm';
import pubFind from '../pubfind/pubfind';
import BScroll from 'better-scroll';
import pubRepair from '../pubrepair/pubrepair';
import login from '../login/login';
import setList from '../setlist/setlist';

const ERR_OK = 0;
const STATE_LOSE = 0; // 寻找中
const STATE_FIND = 1; // 已找回
const STATE_DRAW = 2; // 招领中
const STATE_BACK = 3; // 已归还

export default {
  mounted() {

  },
  data() {
    return {
      user: {},
      findConfirmTxt: '',
      confirmShow: false,
      curFind: {},
      login: false,
      setListData: [
        {
          type: 'loginout',
          text: '退出'
        }, {
          type: 'test',
          text: '测试'
        }, {
          type: 'test',
          text: '测试'
        }, {
          type: 'test',
          text: '测试'
        }
      ]
    };
  },
  created() {
    if (document.cookie) {
      this.login = true;
      this.$axios.get('/api/user').then(response => {
        if (response.data.status === ERR_OK) {
          this.user = response.data.result.list[0];
          console.log(this.user);
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    }
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
    userlogin(user) {
      this.user = user;
      this.login = true;
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
      this.curFind['findtype'] = 'update';
      this.curFind['type'] = 'find';
      this.curFind['userId'] = this.user.userId;
      console.log(this.curFind);

      this.$axios.all([this._postFind(this.curFind), this._postUser(this.curFind)]);

      this.confirmShow = false;
    },
    _postFind(obj) {
      this.$axios.post('/api/find', {
        params: obj
      });
    },
    _postUser(obj) {
      this.$axios.post('/api/user', {
        params: obj
      });
    },
    releaseFindShow() {
      this.$refs.releaseFind.show();
    },
    pubRepairShow() {
      this.$refs.pubRepair.show();
    },
    addUserRepair(obj) {
      this.user.userRepair.unshift(obj);
    },
    addUserFind(obj) {
      this.user.userFind.unshift(obj);
    },
    setListShow() {
      this.$refs.setList.show();
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
    'v-confirm': confirm,
    pubFind,
    pubRepair,
    login,
    setList
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mine
  position absolute
  top 0
  left 0
  bottom 50px
  width 100%
  .setting
    position absolute
    top 15px
    right 15px
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
    position relative
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
    position absolute
    top 10px
    right 10px
    padding 5px
    width 25px
    height 25px
    .icon-add_circle
      font-size 24px
      color #00a0dc
  .repair-info
    position relative
    padding 18px
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
      .consult-text
        margin-bottom 5px
</style>
