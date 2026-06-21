'use strict';
import { Model, DataTypes } from "sequelize";
import type {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";
//import  Product  from "./product.ts";
import  Product from "../src/models/productModel.ts";

export default (sequelize: any) => {
 class Category extends Model <
     InferAttributes<Category>,
     InferCreationAttributes<Category>> {
      
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Category.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
  });
  return Category;
}; 
