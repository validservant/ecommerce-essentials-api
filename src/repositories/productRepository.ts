import Product from "../models/productModel.ts";
import Category from "../models/categoryModel.ts";


// // Repo for TASK 1(ONE) week 5 Create Product - Admin only - authentication stub).
export const prodCartRepo = async(categoryId:number) =>{
    return await Category.findByPk(categoryId);
};

export const createProductRepo = async(data: {
    slug:string;
    title:string;
    descriptions:string;
    image:string;
    price:number;
    stockQuantity:number;
    categoryId:number;
}) => {
    return await Product.create(data);
};

//Repo for Task 1.1 week 5. get the product (List Products - with query parameters for categoryId, search, limit, offset).

export const getProductRepo = async({whereCondition,limit,offset}:{whereCondition: any; limit: number;
  offset: number;}) => {

    return await Product.findAndCountAll({
        where: whereCondition,
        include:[{
          model: Category,
          as: "Category",
          attributes:{
            include:['id','name'],
             exclude: ["createdAt", "updatedAt"],
          }
        }],
        attributes:{
           exclude: ["createdAt", "updatedAt"],
        },

        limit,

        offset,

    });
    }

    // get product by slug Repo
export const getProductBySlugRepo = async (slug:string) =>{
    return await Product.findOne({
    where:{ slug },
    include:[{
      model:Category,
      as: 'Category'
    }]
  });   
}

export const getProductByQueriesRepo = async({whereClause, limit, offset}:{whereClause:any; limit:number; 
    offset:number;}) =>{
        
    return await Product.findAndCountAll({
    where: whereClause,
    include:[{
      model: Category,
      as:"Category",
      attributes:['id', 'name'],
    }],
    limit,
    offset,
  });
}

//updating product by slugs Ro
export const getProductByslupRepo = async (slug:string) => {
   return await Product.findOne({
      where:{slug},
    });
};

export const UpdateProductRepo = async(product:Product) => {
    return  await product.save();
}


//delete Product By slug
export const getProductBySlugToDeleteRepo = async (slug: string) =>{
    return await Product.findOne({
        where:{slug},
    })
};

export const deleteProductBySlugRepo = async (product:Product) =>{
    return await product.destroy();
}