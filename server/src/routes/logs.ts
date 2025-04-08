import express from "express";
import { deleteLog, getLogs } from "../controllers/log-controller.ts";
import { verifyToken } from "../middleware/verify-token.ts";

const router = express.Router();

router.get("/logs", verifyToken, getLogs);
router.delete("/logs/:id", verifyToken, deleteLog);

export default router;
