import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import * as action from "../actions/userAction.js";

const router = Router();
router.get("/", authMiddleware, action.getMe);
router.post("/refresh", action.refresh);

export default router;
