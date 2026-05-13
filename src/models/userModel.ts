import {Model,DataTypes} from "sequelize";
import type{
    InferAttributes,
    InferCreationAttributes,
    CreationOptional } from "sequelize";
    import sequelize from "../config/database.ts";

    export class User extends Model<
        InferAttributes<User>,
        InferCreationAttributes<User>
    >{
        declare id: CreationOptional<number>;
        declare token: string;
        declare username: string;
    }
    User.init({
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
        },
        username:{
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