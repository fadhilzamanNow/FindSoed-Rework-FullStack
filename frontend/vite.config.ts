import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";


export default defineConfig(({ mode }) => {
  console.log("isi mode : ", mode);
  const env = loadEnv(mode, process.cwd());

  console.log("isi env : ", env);
  return {
    plugins: [vue()],
    define: {
      BACKEND_URL: JSON.stringify(env.VITE_BACKEND_URL),
    },
    server: {
      host: "0.0.0.0",
      port: 3050,
      allowedHosts: true,
    },
    build: {
      minify: false,
    },
  };
});
