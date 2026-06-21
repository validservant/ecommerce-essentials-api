//import  Express from "express";
import { Router } from "express";
import {createProduct, getProduct, getProductBySlug, getProducts, updateProducts, deleteProdBySlug} from "../controllers/productController.ts";
import {productCreateSchema} from "../schemas/productSchema.ts";
import {validate} from "../middleware/validate.ts";

const router = Router();

router.post("/createproducts", validate(productCreateSchema), createProduct);
router.get("/getproducts", getProduct);
router.get("/productsbyslug/:slug", getProductBySlug);
router.get("/getprods",getProducts);
router.put("/updateprods/:slug",updateProducts);
router.delete("/deleteprods/:slug", deleteProdBySlug);

export default router;