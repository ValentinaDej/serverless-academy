import { Router } from "express";
import { verifyAccessTokenFromHeaders } from "../middleware/verifyAccessTokenFromHeaders.js";
import { getMe } from "../actions/getMe.js";

const router = Router();
router.get("/", verifyAccessTokenFromHeaders, getMe);

export default router;
