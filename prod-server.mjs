import express from "express";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);

const serverRender = async (_req, res) => {
  const remotesPath = path.join(process.cwd(), `./dist/server/index.js`);

  const importedApp = require(remotesPath);

  const markup =  importedApp.render(_req.url);

  console.log("isi markup : ", markup)

  const template = fs.readFileSync(`${process.cwd()}/dist/index.html`, "utf-8");

  const html = template.replace(`<!--app-content-->`, markup);

  res.status(200).set({ "Content-Type": "text/html" }).send(html);
};

const port = process.env.PORT || 3050;

export async function preview() {
  const app = express();


  const findsoedRoute = ["/","/register","/login", "/home", "/add", "/setting","/detail/:id"];

  findsoedRoute.forEach((v) => {
    app.get(v, (req, res, next) => {
      try {
        serverRender(req, res, next);
      } catch (err) {
        console.error("SSR render error, downgrade to CSR...\n", err);
        next();
      }
    });
  })
 

  app.use(express.static("dist"));

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

preview(process.cwd());
