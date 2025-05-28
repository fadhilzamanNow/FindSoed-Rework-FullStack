import { renderToString } from 'vue/server-renderer'
import createRouter from './router';
import { createSSRApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

export async function render(_url: string) {
  
  const app = createSSRApp(App);
  const pinia = createPinia();
  const router = createRouter();
  app.use(pinia).use(router)
  await router.push(_url)
  await router.isReady();

  const context = {};
  const content = await renderToString(app, context);

  // return application content and state for server-side rendering
  return content ;

}
