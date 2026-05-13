import {createCategory,getCategories, getCategoryBySlug, UpdateCategoryBySlug, deleteBySlugs} from "../controllers/categoryController.ts";
import {Router} from "express";

const router = Router();

router.post("/postcategories", createCategory);
router.get("/getcategories", getCategories);
router.get("/categories/:slug", getCategoryBySlug);
router.put("/upcategories/:slug", UpdateCategoryBySlug);
router.delete("/delcategories/:slug", deleteBySlugs);

export default router;