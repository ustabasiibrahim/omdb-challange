import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';

const BASE_API_URL = 'http://www.omdbapi.com/';

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = BASE_API_URL;
Vue.axios.defaults.headers.common['Accept'] = 'application/json';
Vue.axios.defaults.headers.common['Content-Type'] = 'application/json';
// API KEY
Vue.axios.defaults.params = { apikey : '5fe41122' };

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
