import { createProductCategoryRepo, getAllproductCategoriesRepo, getCategoriesBySlugRepo, getCategoriesUpdateBySlugRepo,getCategoryToDeleteBySlugRepo,updateCategoriesBySlugRepo,deleteCategoryBySlugRepo } from "../repositories/categoryRepository.ts";
import type { categoryCreateInput } from "../schemas/categorySchema.ts";
import crypto from "crypto";

const generateSlug = (name: string) => {
    const random = crypto.randomBytes(4).toString("hex");
    return `${name.toLowerCase().replace(/\s+/g, "-")}-${random}`;
};

// Services for creating category of the product  
export const createCategoryService = async (categoryData: categoryCreateInput) =>{

    const {name, description} = categoryData;
    if (!name) { 
        throw new Error("Name is required");
     };

     const slug = generateSlug(name);
     return await createProductCategoryRepo({name,slug,description});

}
// services foor listing all product categories
export const getAllProductCategoriesService = async() =>{
    return await getAllproductCategoriesRepo()
}

//services for getting category by slug
export const getCategoriesBySlugService = async (Data:string)=>{
    const category = await getCategoriesBySlugRepo(Data);
    
    if (!category) {
        throw new Error ("Category not found");
    }
    return category;
}

//services for updating categories by slug

export const updateCategoriesByslugService = async(slug:string, categoryData: categoryCreateInput) =>{
    
    const {name, description} = categoryData;
    const category = await getCategoriesUpdateBySlugRepo(slug);
     
    if (!category) {
        throw new Error ("Category not found");
    }
    if(name){
        category.name = name;
        category.slug = generateSlug(name);
    }
    else{
        category.name;
    };

    if(description !== undefined){
        category.description = description;
    };

    return await updateCategoriesBySlugRepo(category)
};

// delete Categories by slug Services
export const deleteCategoryBySlugService = async (slug:string) =>{

    const category = await getCategoryToDeleteBySlugRepo(slug);

    if(!category){
      throw new Error("category not available");
    };
    
    return await deleteCategoryBySlugRepo(category);
}