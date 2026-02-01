import { Router } from "express";

import { checkOutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkOutSuccess);

export default router;
