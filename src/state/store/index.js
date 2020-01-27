import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './auth.module';
import { posts } from './posts.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        alert,
        account,
        posts
    }
});
