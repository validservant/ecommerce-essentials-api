import { Model,DataTypes } from "sequelize";
import type {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";
import {sequelize} from "../config/database.ts";
export class category extends Model <
    InferAttributes<category>,
    InferCreationAttributes<category>
    >{
        declare id: CreationOptional<number>;
        declare name:string;
        declare slug: string;
        declare description:string;
    }
    category.init({
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            },
        slug:{
            type:DataTypes.STRING,
            allowNull:false,
            },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
            },
        },
        {
            sequelize,
            tableName:"category",
            timestamps:true,
        }
    );
