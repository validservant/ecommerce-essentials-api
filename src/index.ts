import "dotenv/config";
import express from "express";
import {env} from "./config/env.ts";
import {DB_connect, sequelize} from "./config/database.ts";
import "./models/index.ts";

const app = express();

await DB_connect();

const addModels = async () =>{
    try{
    await sequelize.sync();
    console.log("Db_sync successfully");

app.get("/", (req, res) =>{
    console.log("Testing the app");
})

app.listen(env.PORT, () =>{
   console.log (`server is running on port ${env.PORT}`
);
});
} catch (error){
    console.error(error);
}
};

addModels();
