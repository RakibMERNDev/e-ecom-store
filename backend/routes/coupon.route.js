import { Router } from "express";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', protectRoute, getCoupon)

export default router;