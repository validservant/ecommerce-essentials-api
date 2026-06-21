import { createProductRepo, getProductBySlugToDeleteRepo, prodCartRepo } from "../repositories/productRepository.ts";
import type { productCreateInput } from "../schemas/productSchema.ts";
import { getProductRepo, getProductBySlugRepo, getProductByQueriesRepo, getProductByslupRepo,UpdateProductRepo, deleteProductBySlugRepo} from "../repositories/productRepository.ts";
import {Op}from "sequelize";
import crypto from "crypto";

//how to generate slug

const generateSlug = (title: string) => {
    const random = crypto.randomBytes(4).toString("hex");
    return `${title.toLowerCase().replace(/\s+/g, "-")}-${random}`;
};

// service for creation of products.
export const createProductService = async (productData: productCreateInput) => {
    const { 
    title,
    descriptions,
    image,
    price,
    stockQuantity,
    categoryId,
  } = productData;

  const slug = generateSlug(title);

  const category = await prodCartRepo(categoryId);

  if(!category){
      throw new Error("Category not found");
    }

    return await createProductRepo({
    slug,
    title,
    descriptions,
    image,
    price,
    stockQuantity,
    categoryId,
    });
    };

    //list product service by category, search, limit and offset

    export const getProductService = async (query:any) => {

        const {categoryId, search, limit,offset} = query;

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
        };

        return await getProductRepo({whereCondition,limit: limit?Number(limit):2,

        offset: offset?Number(offset):0,})
    }

    //service to get product by slug
    export const getProductServicesBySlug = async (params:any) => {
        const {slug} = params;
            const getProdBySlug = await getProductBySlugRepo(slug);
            if(!getProdBySlug){ 
                throw new Error ("Product not found")};
        return getProdBySlug;
    }



    export const getProductByQueriesService = async (Data:any) =>{
        
        const {categoryId,search,page,limit} = Data;

        const pageNumber = Number(page) || 1;
         const limitNumber = Number(limit) || 10;

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

     const product =  await getProductByQueriesRepo({whereClause, limit: limitNumber, offset,})
     return {
        totalProduct: product.count,
        totalPages: Math.ceil(product.count/limitNumber),
        currentPage: pageNumber,
        product: product.rows,
        };
    }

       
    
    interface UpdateProductInput { 
            name?:string;
            descriptions?:string;
        }

    export const updateProductServiceBySlug = async (slug:string, productData:UpdateProductInput) => {
       
        
        const product  = await getProductByslupRepo(slug);

        if (!product) {
              throw new Error(" Product not found");
         }

         const {name,descriptions} = productData;

         if(name){
            product.slug = generateSlug(name);
            product.title = name;
         };

         if(descriptions !== undefined){
            product.descriptions = descriptions;
         };

            return await UpdateProductRepo(product);

    } 

    //services for deleting product by slug
    export const deleteProductBySlugService = async (slug:string) =>{

        const product = await getProductBySlugToDeleteRepo(slug);

        if(!product){ 
            throw new Error("product not found");
        };

        return await deleteProductBySlugRepo(product);
    }