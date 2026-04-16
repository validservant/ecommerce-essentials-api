import "dotenv/config";
import express from "express";
import {env} from "./config/env.ts";

const app = express();


app.get("/", (req, res) =>{
    console.log("Testing the app");
})

app.listen(env.PORT, () =>{
   console.log (`server is running on port ${env.PORT}`
);
});
