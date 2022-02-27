import KoaRouter from "koa-router"
import helloApi from "../controllers/hello.js"
import loginApi from "../controllers/login.js"
import fundRouter from "./fund.js"
import accountRouter from "./account.js"

const router = new KoaRouter();

router.get('/', helloApi);
router.post("/login",loginApi );
// these routers must be authenticated
router.use("/fund", fundRouter.routes(), fundRouter.allowedMethods());
router.use("/account", accountRouter.routes(), accountRouter.allowedMethods());

export default  router 
