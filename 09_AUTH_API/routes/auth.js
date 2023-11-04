import { Router } from "express";

import * as action from "../actions/userAction.js";

const router = Router();
router.post("/sign-in", action.signIn);
//new user
router.post("/sign-up", action.signUp);

export default router;
