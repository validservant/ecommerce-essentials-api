import {createrUsers} from "../controllers/registerController.ts";
import { registerSchema } from "../schemas/usersSchema.ts";
import {validate} from "../middleware/validate.ts";
import { Router } from "express";

const router = Router();

router.post("/createnewuser", validate(registerSchema), createrUsers);

export default router;
