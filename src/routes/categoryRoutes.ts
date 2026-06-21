import {createCategory,getCategories, getCategoryBySlug, UpdateCategoryBySlug, deleteBySlugs} from "../controllers/categoryController.ts";
import {Router} from "express";
import { categoryCreateSchema } from "../schemas/categorySchema.ts";
import { validate } from "../middleware/validate.ts";

const router = Router();

router.post("/createcategories",validate(categoryCreateSchema), createCategory);
router.get("/getallcategories", getCategories);
router.get("/categories/:slug", getCategoryBySlug);
router.put("/upcategories/:slug", UpdateCategoryBySlug);
router.delete("/deletecategories/:slug", deleteBySlugs);

export default router;