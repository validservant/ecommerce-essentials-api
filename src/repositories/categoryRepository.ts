
import Category from "../models/categoryModel.ts";


//creating product category repository
export const createProductCategoryRepo = async (data:{
    name:string; 
    slug:string; 
    description:string;

}) =>{
    return await Category.create(data);
};

//List all categories repository

export const getAllproductCategoriesRepo = async () =>{
    return await Category.findAll();
};

// get categories by Id

export const getCategoriesByIdRepo = async () =>{
    return await Category.findOne({
        where:{id:4}
    });
};

//get Category by slug

export const getCategoriesBySlugRepo = async (slug:string) =>{
    return await Category.findOne({
        where:{slug}
    })
}

//update category by slug  Repo
export const getCategoriesUpdateBySlugRepo = async (slug:string) =>{
    return await Category.findOne({
         where: { slug },
        });
};

export const updateCategoriesBySlugRepo = async (category:Category) =>{
    return await category.save();
}

// delete categories by slug Repo
export const getCategoryToDeleteBySlugRepo = async (slug:string) =>{
    return await Category.findOne({
        where:{slug},
    });
}
export const deleteCategoryBySlugRepo = async(category:Category) =>{
   return await category.destroy();
}