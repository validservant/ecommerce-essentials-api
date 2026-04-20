import {user} from "./userModel.ts";
import { product } from "./productModel.ts";
import { category } from "./categoryModel.ts";


// category > prooduct (1 to many)
category.hasMany(product,{
    foreignKey:"categoryId",
    as:"product",
});

product.belongsTo(category,{
    foreignKey:"categoryId",
    as:"category",
});

export { user, product,category };