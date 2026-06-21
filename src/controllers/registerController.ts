import { registerUserService } from "../services/registerUserService.ts";
import type { Request, Response } from "express";
import type {registerInput} from "../schemas/usersSchema.ts";

export const createrUsers = async (req:Request<{},{},registerInput>, res:Response) =>{
    const user = await registerUserService(req.body);
    res.status(200).json({
        status:"user create success",
        users:user,
    })
}