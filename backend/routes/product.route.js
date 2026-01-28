import { Router } from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts } from "../controllers/product.controller.js";

const router = Router();


router.get('/',protectRoute, adminRoute, getAllProducts)
router.get('/featured', getFeaturedProducts)
router.get('/recommendations', getRecommendedProducts)
router.post('/',protectRoute,adminRoute, createProduct)
router.delete('/:id',protectRoute,adminRoute, deleteProduct)

export default router;
