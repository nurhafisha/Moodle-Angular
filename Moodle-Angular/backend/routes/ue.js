import express from "express";
import multer from "multer";
import { getUeById, createCours, createRessource } from "../controllers/ue-controller.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

router.get("/:id", getUeById);
router.post("/new-cours/:id", upload.single("fichier_joint"), createCours);
router.post("/new-ressource/:id", upload.single("fichier_joint"), createRessource);

export default router;
