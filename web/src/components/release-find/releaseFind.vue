<template>
  <transition name="move">
    <div class="release-find" v-show="showFlag">
      <div class="back" @click="hide">
        <i class="icon-arrow_lift"></i>
      </div>
      <h1 class="title">编辑“失物招领”相关信息</h1>
      <div class="edit-user-import">
        <div class="select-object" @click="showPicker">
          <p class="txt" :class="{'dark': darkTxt}">{{selectedTxt}}</p>
        </div>
      </div>
      <div class="edit_user_parsing">
        <h2 class="objdesc">物品描述</h2>
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
import {stateList, typeList, objectList} from '../../common/js/lostProperty.js';
import pubBtn from '../pub-btn/pubBtn';

const lostPropertyData = stateList;
lostPropertyData.forEach((state) => {
  state.children = typeList;
  state.children.forEach((type) => {
    type.children = objectList[type.value];
  });
});

export default {
  props: {
    userName: {
      type: String
    }
  },
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
      showFlag: false,
      selectedTxt: '请选择物品信息',
      darkTxt: false,
      message: ''
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
      this.selectedTxt = '请选择物品信息';
    },
    clearMessage() {
      this.message = '';
    },
    pubConfirm() {
      let find = this.selectedTxt.split('- ');
      if (find.length === 3) {
        let findObj = {};
        if (find[0] === '丢了') {
          findObj['state'] = 0;
        } else {
          findObj['state'] = 1;
        }
        findObj['name'] = this.userName;
        findObj['good'] = find[2]; // good
        findObj['time'] = new Date().getTime();
        findObj['desc'] = this.message;
        console.log(findObj);
      }
      this.showFlag = false;
    },
    showPicker () {
      this.lostPropertyPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.selectedTxt = `${selectedVal.join('- ')}`;
      this.darkTxt = true;
      // this.$createDialog({
      //   type: 'warn',
      //   content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
      //   icon: 'cubeic-alert'
      // }).show();
    },
    cancelHandle() {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show();
    }
  },
  components: {
    'pub-btn': pubBtn
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.release-find
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
  .edit-user-import
    padding-left 10px
    font-size 14px
    color #a7a7a7
    &>div
      padding 10px 0
      border-bottom 1px solid #e6e6e6
    .select-object
      .txt
        padding 5px 0
    .dark
      color #333
  .edit_user_parsing
    margin-top 10px
    padding 0 10px
    color #a7a7a7
    .objdesc
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
