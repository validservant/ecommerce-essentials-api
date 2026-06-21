import "dotenv/config";
import express from "express";
import {env} from "./config/env.ts";
import sequelize from "./config/database.ts";
import categoryRoutes from "./routes/categoryRoutes.ts";
import productRoutes from "./routes/productRoutes.ts";
import registerUserRoutes from "./routes/registerUserRoutes.ts";
import loginRoutes from "./routes/loginRoutes.ts";
import "./models/index.ts"; 

const app = express();
app.use(express.json());

const addModels = async () =>{
    try{
    await sequelize.authenticate();
    
    console.log(" Database connected successfully");
    
    app.use("/api", categoryRoutes);
    app.use("/api", productRoutes);
    app.use("/api", registerUserRoutes);
    app.use("/api", loginRoutes);


    app.listen(env.PORT, () =>{
    console.log (`server is running on port ${env.PORT}`);
    });
    
    } catch (error){
        console.error(error);
        }
    };

addModels();
