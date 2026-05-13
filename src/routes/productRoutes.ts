//import  Express from "express";
import { Router } from "express";
import {createProduct, getProduct, getProductBySlug, getProducts} from "../controllers/productController.ts";

const router = Router();

router.post("/products", createProduct);
router.get("/getproducts", getProduct);
router.get("/productsbyslug/:slug", getProductBySlug);
router.get("/getprods",getProducts)

export default router;