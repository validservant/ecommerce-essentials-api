import Users from "../models/userModel.ts";

export const findUser = async (email:string) =>{
    return await Users.findOne({
        where:{email},
    });
};

export const createUser = async (Data:{
    username:string;
    email:string;
    password:string;
    role:string,
}) =>{
    return await Users.create(Data)
} 
