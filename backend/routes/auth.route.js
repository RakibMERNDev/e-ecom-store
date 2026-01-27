import { Router } from "express";

const router = Router();

router.get("/signup", (req, res) => {
  res.json("Sign Up Route");
});

export default router;
