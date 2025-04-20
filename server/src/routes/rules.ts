import express from "express";
import { verifyToken } from "../middleware/verify-token.ts";
import { createRule, getRules } from "../controllers/rules-controller.ts";

const router = express.Router();

router.get("/rules", verifyToken, getRules);
router.post("/rules", verifyToken, createRule);

export default router;
