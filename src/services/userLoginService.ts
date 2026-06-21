import { findUser } from "../repositories/usersRepository.ts";
import {env} from "../config/env.ts";
import type { loginInput } from "../schemas/usersSchema.ts";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";


export const userLoginServices = async (data:loginInput) => {
    const {email, password} = data;
    const checkUser = await findUser(email);
    if(!checkUser){
        throw new Error("email does not exist");
    };

    const checkForMAtch = await bcrypt.compare(password, checkUser.password);
    if(!checkForMAtch){
        throw new Error("invalid credentials");
    }
    const token = jwt.sign(
        {username: checkUser.username,
         role: checkUser.role,
        },
            env.JWT_SECRET,
        {
            expiresIn : "1hr",
        }
    );

    return token;

}