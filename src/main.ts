import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// import zhLang from 'element-plus/lib/locale/lang/zh-cn';
import zhLang from 'element-plus/es/locale/lang/zh-cn';

zhLang.el.pagination.goto = '跳转';
import btnAntiShake from '@/utils/btnAntiShake';
import config from '@/utils/config';

import '@/assets/fontFamily/font.css';

import 'amfe-flexible';

const pinia = createPinia();

const app = createApp(App);

app.config.globalProperties.$config = config;

app.use(pinia);
app.use(router);

app.use(store, key);

app.use(btnAntiShake);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// app.mount('#app');


document.title = `${config.name}${config.title}`;

app.mount('#app');