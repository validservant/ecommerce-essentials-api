import type { Request, Response } from "express";
import Category from "../models/categoryModel.ts";
import type { categoryCreateInput } from "../schemas/categorySchema.ts";
import { createCategoryService, getAllProductCategoriesService, getCategoriesBySlugService,updateCategoriesByslugService, deleteCategoryBySlugService} from "../services/categoryService.ts";
import {getCategoryToDeleteBySlugRepo} from "../repositories/categoryRepository.ts"
//  function to generate slug



// POST /api/categories (Create Category - Admin only - basic authentication stub for now).
export const createCategory = async (req: Request<{},{},categoryCreateInput>, res: Response) => {
  try {
    //Basic admin check (stub)

    const isAdmin = true;
    if (!isAdmin) {
      return res.status(403).json({ message: "user must be admin to create" });
    }
    const category = await createCategoryService( req.body);
    console.log(category);
    res.status(201).json(category);
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// List All Categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllProductCategoriesService();
    res.json(categories);
    console.log(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// get categories for product
export const getCategoryByone = async (req:Request, res:Response) =>{
   const getCategoriesById =  await Category.findOne({
     where:{ id:4 }
   });
   res.status(200).json(getCategoriesById);
};

//GET CATEGORY BY SLUG
export const getCategoryBySlug = async (req: Request<{slug:string}>, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await getCategoriesBySlugService(slug);
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Update Category by slug

export const UpdateCategoryBySlug = async(req:Request<{slug:string}>, res:Response) =>{
  try{
    const Admin:boolean = true;
    const {slug} = req.params;
    const {name} = req.body;

    if(!Admin){
      res.status(403).json({msg:"user must be Admin to update category"});
    };
    const category = await updateCategoriesByslugService(slug, req.body )
    return res.status(200).json({
      message: "Category updated",
      data: category,
    });
    }
    catch (error) {
      return res.status(500).json({
      message: "Err updating category"
    });
  };
};

//Delete category by slug

  export const deleteBySlugs = async (req:Request<{slug:string}>, res:Response) =>{

    try{
         const Admin:boolean = true;
          const {slug} = req.params;

         if(!Admin){
            return res.status(403).json({msg:"user must be admin to delete"});
         }
         const getCategoryByslug = await getCategoryToDeleteBySlugRepo(slug);
         const deletedCategory = await deleteCategoryBySlugService(slug);
         
        return res.status(200).json({
        msg:"deleted successfully", 
        data:getCategoryByslug ,
        });
    }
     catch (error:any){
        return res.status(500).json({ message: error.message});
      };
  };


//export default {createCategory,getCategories,getCategoryBySlug, UpdateCategoryBySlug, deleteBySlugs, getCategoryByone};