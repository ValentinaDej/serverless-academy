import { Router } from "express";
import invalidBodyHandler from "../middleware/invalidBodyHandler.js";
import * as action from "../actions/linkAction.js";

const router = Router();
router.post("/", invalidBodyHandler, action.addShortLink);

router.get("/:path", action.followShortLink);

export default router;
