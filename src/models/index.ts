//import {User} from "./userModel.ts";
import Product from "./productModel.ts";
import  Category from "./categoryModel.ts";


// category > prooduct (1 to many)
 Product.belongsTo(Category,{
        foreignKey:'categoryId',
        as:"Category"
      });
Category.hasMany(Product, {
        foreignKey:"categoryId",
        as: "Product"
      });

//export {  Product,Category };