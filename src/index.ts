import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { router } from './router';
import { createPinia } from 'pinia';
import 'intl-tel-input/build/css/intlTelInput.css';


const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#root');
