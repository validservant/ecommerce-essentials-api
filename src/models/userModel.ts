import {Model,DataTypes} from "sequelize";
import type{
    InferAttributes,
    InferCreationAttributes,
    CreationOptional } from "sequelize";
    import {sequelize} from "../config/database.ts";

    export class user extends Model<
        InferAttributes<user>,
        InferCreationAttributes<user>
    >{
        declare id: CreationOptional<number>;
        declare token: string;
        declare userName: string;
    }
    user.init({
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
        },
        userName:{
           type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        token:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },   
      },
      {
            sequelize,
            tableName:"user",
            timestamps: true,
        }, 
    );