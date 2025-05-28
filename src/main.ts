import { createApp } from "vue";
import App from "./App.vue";
import createRouter from "./router";

const router = createRouter();

// initialize the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
/* if (window && window.__INITIAL_STATE__) {
  store.state.value = window.__INITIAL_STATE__;
} */
console.log("test dari sini")
createApp(App).use(router).mount("#roots", true);