import { Router } from "express";

const router = Router();


router.get('/',protectRoute, adminRoute, getAllProducts)

export default router;
