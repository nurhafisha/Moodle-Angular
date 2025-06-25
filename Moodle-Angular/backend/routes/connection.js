import { getConnectionLog } from "../controllers/connection-log.js";
import express from "express";

const router = express.Router();

router.get("/", getConnectionLog);

export default router;
