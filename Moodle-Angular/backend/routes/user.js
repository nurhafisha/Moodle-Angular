import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user-controller.js";
import {
  verifyToken,
  verifyAdmin,
  verifyEnseignant,
} from "../utils/verifyToken.js";
import { getUserProfile } from "../controllers/user-controller.js";
import {uploadImage} from "../utils/upload.js";

import multer from "multer"; // Pour gérer les téléchargements de fichiers

// Initialize router
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
})
const upload = multer({ storage });

// creation d'un utilisateur
router.post("/", createUser);

// Recuperer tous les utilisateurs disponibles
router.get("/", getAllUsers);

// Supprimer l'utilisateur par ID
router.delete("/:id", deleteUser);

// Recuperer le profil de l'utilisateur authentifié
router.get("/profile", verifyToken, getUserProfile);

router.patch("/:id", updateUser);

// Mettre à jour le profil d'un utilisateur
router.put(
  "/:id",
  verifyToken,
  uploadImage.single("profilePictureFile"),
  updateUser
);

//router.get('/:id', verifyToken, getById);
//router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

export default router;
