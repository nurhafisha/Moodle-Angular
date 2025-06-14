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
import multer from "multer"; // Pour gérer les téléchargements de fichiers

// Initialize router
const router = express.Router();
// Use multer with memory storage (storing file in memory temporarily)
const storage = multer.memoryStorage();
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
  upload.single("profilePictureFile"),
  updateUser
);

//router.get('/:id', verifyToken, getById);
//router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

export default router;
