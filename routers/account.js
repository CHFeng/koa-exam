import KoaRouter from "koa-router"
import controller from "../controllers/account.js"

const router = new KoaRouter();

router.get('/', controller);


export default  router 