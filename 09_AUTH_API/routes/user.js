import { Router } from "express";
import { getMe } from "../actions/getMe.js";

const router = Router();
router.get("/", getMe);

export default router;
