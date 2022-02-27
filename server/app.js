import Koa from "koa"
import koaBody from "koa-body"
import bodyParser from "koa-bodyparser"
import router from "../routers/index.js"

const app = new Koa();

app.use(koaBody());
app.use(bodyParser());
// app.use(async ctx => {
//     // the parsed body will store in ctx.request.body
//     // if nothing was parsed, body will be an empty object {}
//     ctx.body = ctx.request.body;
//   });
app.use(router.routes(), router.allowedMethods());
app.listen(3000);

console.log("Server Start on http://localhost:3000")