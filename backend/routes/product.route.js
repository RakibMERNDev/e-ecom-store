import { Router } from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAllProducts, getFeaturedProducts, createProduct } from "../controllers/product.controller.js";

const router = Router();


router.get('/',protectRoute, adminRoute, getAllProducts)
router.get('/featured', getFeaturedProducts)
router.post('/',protectRoute,adminRoute, createProduct)

export default router;
