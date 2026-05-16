import type { Request, Response } from "express";
import Product from "../models/productModel.ts";
import Category from "../models/categoryModel.ts";
import {Op}from "sequelize";
import { stringify } from "node:querystring";

//TASK 1(ONE) week 5 Create Product - Admin only - authentication stub).
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};


export const createProduct = async (req:Request, res:Response) => {

  try{
    const Admin:boolean = true;
    if(!Admin){
      res.status(403).json({msg:"user must be admin to create product"});
    }
    const { title, descriptions, image, price, stockQuantity, categoryId } = req.body;

    const slug = generateSlug(title);
    const prodCart = await Category.findByPk(categoryId);
      
    if(!prodCart){
      return res.status(404).json({msg:"Category not found"});
    }

    const creatProd = await Product.create({ slug, title,descriptions,image,price,stockQuantity,categoryId});
    console.log(creatProd);
     res.json(creatProd);    
  }catch(error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Task 1.1 week 5. get the product (List Products - with query parameters for categoryId, search, limit, offset).
export const getProduct = async (req:Request, res:Response) =>{
    const {categoryId, search, limit,offset} = req.query;

    const whereCondition :any = {};

    //search by categoryId
    if(categoryId){
      whereCondition.categoryId = categoryId;
    }

    // search by title
    if(search){
      whereCondition.title = {
        [Op.iLike]:`%${search}%`,
      };
    }

    const products = await Product.findAndCountAll({
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

        limit: limit?Number(limit):2,

        offset: offset?Number(offset):0,

    });
    res.status(200).json({
      success:true,
      total: products.count,
      products: products.rows,
    });
};


//Task 1.2 week 5, GET /api/products/:slug

export const getProductBySlug = async (req:Request, res:Response) =>{
  const {slug} = req.params;
  const getProdBySlug = await Product.findOne({
    where:{ slug },
    include:[{
      model:Category,
      as: 'Category'
    }]
  });
  if (!getProdBySlug){ return res.status(404).json({msg:"Product not found"})};
    console.log(getProdBySlug);
    res.json(getProdBySlug);
}

//TASK (2) two  week 5, implementing pagination logic

export const getProducts = async(req:Request, res: Response) =>{
  const {categoryId,search,page,limit} = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  //number of skip

  const offset = (pageNumber - 1) * limitNumber;

  //whereClause
  const whereClause: any = {};
  
  //filter by category
  if(categoryId){
    whereClause.categoryId = categoryId;
  };

  //filter by search
  if(search){
    whereClause.search ={ 
      [Op.iLike] : `%${search}%}`,
     }
  };
  //fetching the product
  const getProds = await Product.findAndCountAll({
    where: whereClause,
    include:[{
      model: Category,
      as:"Category",
      attributes:['id', 'name'],
    }],
    limit: limitNumber,
    offset,
  });
  
  res.status(200).json({
    totalProduct: getProds.count,
    totalPages: Math.ceil(getProds.count/limitNumber),
    currentPage: pageNumber,
    product: getProds.rows,
  });

};

export default { createProduct, getProduct, getProductBySlug,getProducts};