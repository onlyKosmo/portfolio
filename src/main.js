import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import './css/style.css'
import './css/fonts.css'
import { createPinia } from 'pinia'


const app = createApp(App);


const pinia = createPinia()
app.use(pinia)


app.use(router);
app.mount('#app');
