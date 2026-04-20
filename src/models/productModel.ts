import { Model, DataTypes } from "sequelize";
import type{
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize"

import {sequelize} from "../config/database.ts";

export class product extends Model < 
    InferAttributes<product>,
    InferCreationAttributes<product>>{
        declare id: CreationOptional<number>;
        declare slug: string;
        declare title: string;
        declare description: string;
        declare image: string;
        declare price: number;
        declare stockQuantity: number;
        declare categoryId: number;
    }
    product.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        slug:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        title:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        stockQuantity:{
            type:DataTypes.INTEGER,

        },
        categoryId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },
    {
        sequelize,
        tableName:"product",
        timestamps:true,
    }
);