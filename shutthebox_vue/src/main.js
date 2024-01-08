import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;

const app = createApp(App)
app.use(router)
app.mount('#app')
