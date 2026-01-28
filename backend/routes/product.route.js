import { Router } from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = Router();


router.get('/',protectRoute, adminRoute, getAllProducts)

export default router;
