import {
  getConnectionLog,
  createConnectionLog,
} from "../controllers/connection-log.js";
import express from "express";

const router = express.Router();

router.get("/", getConnectionLog);

router.post("/", createConnectionLog);
// router.get("/:id", getUserConnectionLog);

export default router;
