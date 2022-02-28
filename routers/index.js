import KoaRouter from "koa-router"
import helloApi from "../controllers/hello.js"
import account from "../controllers/account.js"
import fundRouter from "./fund.js"
import accountRouter from "./account.js"
import tradeRouter from "./trade.js"

const router = new KoaRouter();

router.get('/', helloApi);
router.post("/singin", account.singin );
router.post("/singup", account.singup );
// these routers must be authenticated
router.use("/fund", fundRouter.routes(), fundRouter.allowedMethods());
router.use("/account", accountRouter.routes(), accountRouter.allowedMethods());
router.use("/trade", tradeRouter.routes(), tradeRouter.allowedMethods());

export default  router 
