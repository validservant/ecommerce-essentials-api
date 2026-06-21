'use strict';
import {Model,DataTypes} from'sequelize';
//import Category from "./category.ts";
import Category  from "../src/models/categoryModel.ts";

export default (sequelize:any ) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      Product.belongsTo(Category,{
        foreignKey:'categoryId',
        as:"Category"
      });
      Category.hasMany(Product, {
        foreignKey:"categoryId",
        as: "Product"
      });
    }
  }
  Product.init({
    id: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    descriptions: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stockQuantity: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};