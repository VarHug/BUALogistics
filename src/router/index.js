import Vue from 'vue';
import Router from 'vue-router';
import topic from '../components/topic/topic.vue';
import mes from '../components/mes/mes.vue';
import repair from '../components/repair/repair.vue';
import mine from '../components/mine/mine.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/topic', component: topic
    },
    {
      path: '/mes', component: mes
    },
    {
      path: '/repair', component: repair
    },
    {
      path: '/mine', component: mine
    }
  ],
  linkActiveClass: 'active'
});
