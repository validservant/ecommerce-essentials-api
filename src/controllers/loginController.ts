import type { Request, Response } from "express";
import type { loginInput } from "../schemas/usersSchema.ts";
import { userLoginServices } from "../services/userLoginService.ts";


export const Login = async (req:Request<{},{},loginInput >, res:Response) =>{
    const {email,password} = req.body;
    const token = await userLoginServices(req.body);

    res.status(200).json({
        msg:"success",
        token
    });

}