<template>
  <div class="login">
    <div class="errtip">{{getErrTip}}</div>
    <div class="edit-user">
      <cube-input v-model="userId" type="text" placeholder="请在此输入帐号" :clearable="true"></cube-input>
      <cube-input v-model="userPwd" type="password" placeholder="请在此输入密码" :eye="eye" :clearable="true"></cube-input>
    </div>
    <div class="pub-btn" @click="loginIn">登录</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      errtip: '您未登录，请先登录',
      userId: '',
      userPwd: '',
      eye: {
        open: false
      }
    };
  },
  computed: {
    getErrTip() {
      return this.errtip;
    }
  },
  methods: {
    loginIn() {
      if (!this.userId || !this.userPwd) {
        this.errtip = '帐号或密码不能为空';
      } else {
        this.$axios.post('/api/user/login', {
          userId: parseInt(this.userId),
          userPwd: parseInt(this.userPwd)
        }).then((reponse) => {
          let res = reponse.data;
          console.log(res);
          if (res.status === 0) {
            if (res.msg === 'not') {
              this.errtip = '帐号或密码错误';
            } else if (res.msg === 'ok') {
              this.$emit('userlogin', res.result);
            }
          }
        });
      }
    }
  },
  components: {

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.login
  position fixed
  top 0
  left 0
  bottom 50px
  width 100%
  background #edf0f4
  .errtip
    color #666
    font-size 14px
    margin 100px 0 5px 5px
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
