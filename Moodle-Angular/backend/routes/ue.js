import express from "express";
import { getUeById } from "../controllers/ue-controller.js";

const router = express.Router();

router.get("/:id", getUeById);

export default router;
