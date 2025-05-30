import express from 'express';
import {getAllUsers, getById, updateUser, deleteUser } from '../controllers/user-controller.js'
import { verifyToken, verifyAdmin, verifyEnseignant } from "../utils/verifyToken.js";
import { getUserProfile } from '../controllers/user-controller.js';
import multer from 'multer'; // Pour gérer les téléchargements de fichiers

// Initialize router
const router = express.Router(); 
// Use multer with memory storage (storing file in memory temporarily)
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

// Obtenir le profil de l'utilisateur authentifié
router.get('/profile', verifyToken, getUserProfile);
// Mettre à jour le profil d'un utilisateur
router.put('/:id', verifyToken, upload.single('profilePictureFile'), updateUser);

// (Optional) Des routes d'administration supplémentaires peuvent être réactivées ultérieurement :

//router.get('/', verifyToken, verifyAdmin, getAllUsers);
//router.get('/:id', verifyToken, getById);
//router.delete('/:id', verifyToken, verifyAdmin, deleteUser);


export default router;