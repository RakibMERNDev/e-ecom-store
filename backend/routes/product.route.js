import { Router } from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAllProducts, getFeaturedProducts } from "../controllers/product.controller.js";

const router = Router();


router.get('/',protectRoute, adminRoute, getAllProducts)
router.get('/featured', getFeaturedProducts)

export default router;
