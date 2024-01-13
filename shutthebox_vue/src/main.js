import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import wb from "./registerServiceWorker";
import { createLogto } from '@logto/vue';

const configLogTo = {
  endpoint: 'https://qa1b44.logto.app/',
  appId: '61ypj2a4y2addwa73wpij',
};

const app = createApp(App);

app.use(createLogto, configLogTo);
app.use(router);
app.mount('#app');
app.config.globalProperties.$workbox = wb

