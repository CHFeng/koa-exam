import KoaRouter from "koa-router";
import controller from "../controllers/trade.js";
import verifyToken from "../middleware/verify-token.js";

const router = new KoaRouter();

router.use(verifyToken);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.patch("/", controller.update);

export default  router 