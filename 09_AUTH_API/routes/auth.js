import { Router } from "express";
import authValidationMiddlevare from "../middleware/authValidationMiddlevare.js";
import * as action from "../actions/userAction.js";

const router = Router();
router.post("/sign-in", authValidationMiddlevare, action.signIn);
//new user
router.post("/sign-up", authValidationMiddlevare, action.signUp);

export default router;
