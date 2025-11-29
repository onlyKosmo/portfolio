import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import './css/style.css'
import './css/fonts.css'


const app = createApp(App);
app.use(router);
app.mount('#app');
