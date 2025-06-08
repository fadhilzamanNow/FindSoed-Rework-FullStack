import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";

const { parsed } = loadEnv();

export default defineConfig({
  plugins: [pluginVue()],
  source: {
    define: {
      /* @ts-ignore */
      BACKEND_URL: JSON.stringify(parsed.PUBLIC_BACKEND_URL),
    },
  },
  html: {
    template: "./template.html",
  },
});
