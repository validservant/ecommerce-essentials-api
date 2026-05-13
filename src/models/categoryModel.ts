import { Model,DataTypes } from "sequelize";
import type {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";
import sequelize from "../config/database.ts";

export default class Category extends Model <
    InferAttributes<Category>,
    InferCreationAttributes<Category>
    >{
        declare id: CreationOptional<number>;
        declare name:string;
        declare slug: string;
        declare description:string;
    }
    Category.init({
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
