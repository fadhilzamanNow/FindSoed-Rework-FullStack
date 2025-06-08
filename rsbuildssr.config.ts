import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { loadEnv } from "@rsbuild/core";

const { parsed } = loadEnv();

console.log("ssr here");
export default defineConfig({
  plugins: [pluginVue()],
  environments: {
    web: {
      output: {
        target: "web",
      },
      source: {
        entry: {
          index: "./src/index",
        },
      },
    },
    ssr: {
      output: {
        target: "node",
        distPath: {
          root: "dist/server",
        },
      },
      source: {
        entry: {
          index: "./src/index.server",
        },
      },
    },
  },
  html: {
    template: "./template.html",
  },
  source: {
    define: {
      /* @ts-ignore */
      BACKEND_URL: JSON.stringify(parsed.PUBLIC_BACKEND_URL),
    },
  },
});
