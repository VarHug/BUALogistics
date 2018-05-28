// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Axios from 'axios';
import {formatDate} from './common/js/date';

import './common/stylus/index.styl';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;
Vue.filter('formatDate', (time) => {
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm');
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
