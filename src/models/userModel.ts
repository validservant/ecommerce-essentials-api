import {Model,DataTypes} from "sequelize";
import type{
    InferAttributes,
    InferCreationAttributes,
    CreationOptional } from "sequelize";
    import sequelize from "../config/database.ts";

    export default class Users extends Model<
        InferAttributes<Users>,
        InferCreationAttributes<Users>
    >{
        declare id: CreationOptional<number>;
        declare username:string;
        declare email: string;
        declare password: string;
        declare role:string;
    }
    Users.init({
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        email:{
           type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role:{
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue:"user",
        } ,  
      },
      {
            sequelize,
            tableName:"Users",
            timestamps: true,
        }, 
    );