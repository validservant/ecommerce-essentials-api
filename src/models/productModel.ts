import { Model, DataTypes } from "sequelize";
import type{InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize"

import sequelize from "../config/database.ts";

export default class Product extends Model < 
    InferAttributes<Product>,
    InferCreationAttributes<Product>>{
        declare id: CreationOptional<number>;
        declare slug: string;
        declare title: string;
        declare descriptions: string;
        declare image: string;
        declare price: number;
        declare stockQuantity: number;
        declare categoryId: ForeignKey<number>;
    }
    Product.init({
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
        descriptions:{
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
            allowNull:false

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