import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { router } from './router';
import Antd from 'ant-design-vue';

createApp(App).use(router).use(Antd).mount('#root');
