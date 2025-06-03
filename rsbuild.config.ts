import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { loadEnv, mergeRsbuildConfig } from "@rsbuild/core";

const { parsed } = loadEnv();

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
      BACKEND_URL:
        /* @ts-ignore */
        process.env.NODE_ENV === "production"
          ? JSON.stringify(parsed.PRODUCTION_BACKEND_URL)
          : JSON.stringify(parsed.DEVELOPMENT_BACKEND_URL),
    },
  },
});
