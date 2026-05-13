import type { Request, Response } from "express";
import Category from "../models/categoryModel.ts"


//  function to select slug
const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

/*enum UsersRole{
  Admin =  0,
  user = 1
}*/

//  POST /api/categories (Create Category - Admin only - basic authentication stub for now).
export const createCategory = async (req: Request, res: Response) => {
  try {
    //Basic admin check (stub)
    const isAdmin = true;

    if (!isAdmin) {
      return res.status(403).json({ message: "user must be admin to create" });
    }
    const { name, description } = req.body;
    if (!name) { return res.status(400).json({ message: "Name is required" }); }
    
    const slug = generateSlug(name);
    const category = await Category.create({ name, slug, description});
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
    const categories = await Category.findAll();
    res.json(categories);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// get categories for product
export const getCategoryByone = async () =>{
   const getCategoriesById =  await Category.findOne({
     where:{ id:4 }
   });
   return getCategoriesById;
};

//GET CATEGORY BY SLUG
export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({
      where: { slug },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Update Category by slug

export const UpdateCategoryBySlug = async(req:Request, res:Response) =>{
  try{
    const Admin:boolean = true;
    const {slug} = req.params;
    const {name} = req.body;

    if(!Admin){
      res.status(403).json({msg:"user must be Admin to update category"});
    };
    const searchCategory:any = await Category.findOne({ where: { slug } });

     if(!searchCategory){
      res.status(404).json({msg:"category not found"});
    }
    if(searchCategory){
       searchCategory.name = name;
     }else{
        searchCategory.name;
     };

    if(name){
      searchCategory.slug = name.toLowerCase().replace(/\s+/g, "-");
    };
    await searchCategory.save();
    return res.status(200).json({
      message: "Category updated",
      data: searchCategory
    });
    }
    catch (error) {
      return res.status(500).json({
      message: "Err updating category"
    });
  };
};

//Delete category by slug

  export const deleteBySlugs = async(req:Request, res:Response) =>{

    try{
    const Admin:boolean = true;
    const {slug} = req.params;

    if(!Admin){
      res.status(403).json({msg:"user must be admin to delete"});
    }
     const deleteBySlug:any = await Category.findOne({where:{slug}});

    if(!deleteBySlug){
      res.status(404).json({msg:"category not available"});
    }
      await deleteBySlug.destroy();
      return res.status(200).json({msg:"deleted successfully", data:deleteBySlug });
     }
     catch (error){
    return res.status(500).json({ message: "Error deleting category"});
    };
  };


export default {createCategory,getCategories,getCategoryBySlug, UpdateCategoryBySlug, deleteBySlugs, getCategoryByone};