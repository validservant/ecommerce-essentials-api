import {createUser, findUser} from "../repositories/usersRepository.ts";
import type {registerInput} from "../schemas/usersSchema.ts";
import bcrypt from "bcrypt";

export const registerUserService = async (Data:registerInput) =>{

    const {username, email, password, role} = Data;

    const searchUser = await findUser(email);

    if(searchUser){
        throw new Error("user already available");
    }
   const hashedPassword = await bcrypt.hash(password,15);

    return await createUser({username,email,password:hashedPassword,role});
}