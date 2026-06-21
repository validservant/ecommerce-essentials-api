import type { Request, Response } from "express";
import { createProductService, getProductService, getProductServicesBySlug, getProductByQueriesService, updateProductServiceBySlug, deleteProductBySlugService } from "../services/productService.ts";
import type {productCreateInput} from "../schemas/productSchema.ts";
import { queryObjects } from "node:v8";
import { getProductBySlugToDeleteRepo } from "../repositories/productRepository.ts";

//TASK 1(ONE) week 5 Create Product - Admin only - authentication stub).


export const createProduct = async (req:Request<{}, {}, productCreateInput>, res:Response) => {

  try{
    const Admin:boolean = true;
    if(!Admin){
      return res.status(403).json({msg:"user must be admin to create product"});
    }
    
    const creatProd = await createProductService(req.body);
    console.log(creatProd);
     return res.status(201).json(creatProd); 

  }catch(error: any) {
    return res.status(500).json({ message: error.message });
  }
};


// Task 1.1 week 5. get the product (List Products - with query parameters for categoryId, search, limit, offset).
export const getProduct = async (req:Request, res:Response) =>{

  try{
    const products = await getProductService(req.query)
    return res.status(200).json({
      success:true,
      total: products.count,
      products: products.rows,
    });
    }catch(error:any){
      return res.status(500).json({
        message: error.message,
      });

    }
};


//Task 1.2 week 5, GET /api/products/:slug

export const getProductBySlug = async (req:Request, res:Response) =>{

     const product = await getProductServicesBySlug(req.params);

    res.status(200).json(product);
}


//TASK (2) two  week 5, implementing pagination logic

export const getProducts = async(req:Request, res: Response) =>{
  
  //fetching the product
  const product = await getProductByQueriesService(req.query);
  
  res.status(200).json(product);

};


// Task 1 one week 6, PUT /api/products/:slug (Update Product - Admin only).

export const updateProducts = async (req:Request<{slug:string}>, res:Response) => {
  const Admin: boolean = true;
  if(!Admin){
    return res.status(403).json({msg: " You must be an admin to update a product"})
  };
    const {slug} = req.params;
    const product = await updateProductServiceBySlug(slug, req.body);
  
    console.log(product);
    return res.status(200).json({
      msg:"created success",
      product:product
    });
  
};

// Task 2 one week 6 DELETE /api/products/:slug

  export const deleteProdBySlug = async (req:Request<{slug:string}>, res:Response ) => {
    
    try{
          const Admin = true;
          if (!Admin){
              return res.status(403).json({msg: " You must be an admin to delete a product"});
          };
          const {slug} = req.params;
          const deletedProduct = await getProductBySlugToDeleteRepo(slug)
          const product =  await deleteProductBySlugService(slug);

          console.log(deletedProduct);

          return res.status(200).json({
            msg:"product deleted successfully",
            products:deletedProduct,
          })
    }catch(err:any){
      return res.status(500).json({msg:err.message});
    }
    
  };
//export default { createProduct, getProduct, getProductBySlug,getProducts, updateProducts, deleteProdBySlug};