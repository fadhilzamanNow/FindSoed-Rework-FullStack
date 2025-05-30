import { createApp } from "vue";
import App from "./App.vue";
import createRouter from "./router";
import "./index.css"
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";


const head = createHead()

const router = createRouter();
const pinia = createPinia();

// initialize the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
/* if (window && window.__INITIAL_STATE__) {
  store.state.value = window.__INITIAL_STATE__;
} */
  
createApp(App).use(head).use(pinia).use(router).mount("#root", true);








