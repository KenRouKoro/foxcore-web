import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vfonts/Lato.css'
import naive from "naive-ui";
import {router} from "./route/index.js";
import Config from "./config.js";

const app = createApp(App)

app.config.globalProperties.$config = Config;

app.use(naive)
app.use(router)

app.mount('#app')
