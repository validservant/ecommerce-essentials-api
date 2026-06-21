import {Login} from "../controllers/loginController.ts";
import { loginSchema } from "../schemas/usersSchema.ts";
import {validate} from "../middleware/validate.ts";
import { Router } from "express";

const router = Router();

router.post("/Loginuser", validate(loginSchema), Login);

export default router;