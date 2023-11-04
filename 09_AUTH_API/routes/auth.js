import { Router } from "express";

import { signUp } from "../actions/signUp.js";
import { signIn } from "../actions/signIn.js";

const router = Router();
router.post("/sign-in", signIn);
//new user
router.post("/sign-up", signUp);

export default router;
