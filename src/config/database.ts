import { Sequelize } from "sequelize";
import "dotenv/config";
import {env} from "./env.ts";

 const sequelize = new Sequelize(
        env.DB_NAME as string,
        env.DB_USER as string,
        env.DB_PWD as string,
    {
     host: env.DB_HOST as string,
     dialect: 'postgres',
     logging: false,
     define:{
        timestamps:true,
     }
    }
);
export default sequelize;
