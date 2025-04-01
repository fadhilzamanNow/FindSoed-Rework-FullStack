import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { router } from './router';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App).use(router).use(Antd).use(pinia).mount('#root');
