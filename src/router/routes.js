import Vue from 'vue';
import Router from 'vue-router';
/* eslint-disable no-unused-vars */
import appConfig from '../../src/app.config'
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home'),
      meta: {
        authRequired: true,
        title: 'Story Board' + ' | ' + appConfig.title
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/login'),
      meta: {
        title: 'Login' + ' | ' + appConfig.title,
      },
    },
    {
      path: '/404',
      name: '404',
      meta: { title: '404' + ' | ' + appConfig.title },
      component: require('./views/utility/404').default,
    },
    {
      path: '*',
      redirect: '404',
    }
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  document.title = to.meta.title;
  next();
});

export default router;
