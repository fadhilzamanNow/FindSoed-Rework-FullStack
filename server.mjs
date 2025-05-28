import express from "express";
import { createRsbuild, loadConfig, logger } from "@rsbuild/core";
// this runs in Node.js on the server.
import { createSSRApp } from 'vue'
// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { renderToString } from 'vue/server-renderer'

const serverRender = (serverAPI) => async (_req, res) => {
  console.log("isi req test : ", _req.url);
  const indexModule = await serverAPI.environments.ssr.loadBundle("index");

  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  const otw = await renderToString(app)
  

  

  const markup = await indexModule.render(_req.url);

  const template = await serverAPI.environments.web.getTransformedHtml("index");

  const html = template.replace("<!--app-content-->", markup );

  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  res.end(html);
};

export async function startDevServer() {
  const { content } = await loadConfig({});

  // Init Rsbuild
  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  });

  const app = express();

  // Create Rsbuild DevServer instance
  const rsbuildServer = await rsbuild.createDevServer();

  const serverRenderMiddleware = serverRender(rsbuildServer);

  const findsoedRouter = ["/register","/login","/home","/add","/setting"] ;

  findsoedRouter.forEach((v) => {
    app.get(v, async (req, res, next) => {
      try {
        console.log("kesini")
        await serverRenderMiddleware(req, res, next);
      } catch (err) {
        logger.error("SSR render error, downgrade to CSR...\n", err);
        next();
      }
    });
  })

 

 

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares);


 /*  app.get("*all", async (req,res,next) => {
    res.status(404).redirect("/")
  }) */

  const httpServer = app.listen(rsbuildServer.port, () => {
    // Notify Rsbuild that the custom server has started
    rsbuildServer.afterListen();
  });

  rsbuildServer.connectWebSocket({ server: httpServer });

  return {
    close: async () => {
      await rsbuildServer.close();
      httpServer.close();
    },
  };
}

startDevServer();
