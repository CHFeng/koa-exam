import KoaRouter from "koa-router"
import helloApi from "../controllers/hello.js"
import account from "../controllers/account.js"
import fundRouter from "./fund.js"
import accountRouter from "./account.js"

const router = new KoaRouter();

router.get('/', helloApi);
router.post("/singin", account.singin );
router.post("/singup", account.singup );
// these routers must be authenticated
router.use("/fund", fundRouter.routes(), fundRouter.allowedMethods());
router.use("/account", accountRouter.routes(), accountRouter.allowedMethods());

export default  router 
