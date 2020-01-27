import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import vco from "v-click-outside";
import router from './router/routes';
import "@/design/index.scss";
import VueSweetalert2 from 'vue-sweetalert2';
import VueTimeago from 'vue-timeago';
import store from './state/store/index.js';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(vco);

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en-gb'
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(require('vue-chartist'));
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
