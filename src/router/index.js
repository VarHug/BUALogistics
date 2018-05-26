import Vue from 'vue';
import Router from 'vue-router';
import find from '../components/find/find.vue';
import info from '../components/info/info.vue';
import repair from '../components/repair/repair.vue';
import mine from '../components/mine/mine.vue';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/find',
      component: find
    }, {
      path: '/info',
      component: info
    }, {
      path: '/repair',
      component: repair
    }, {
      path: '/mine',
      component: mine
    }, {
      path: '/',
      redirect: '/info'
    }
  ],
  linkActiveClass: 'active'
});
