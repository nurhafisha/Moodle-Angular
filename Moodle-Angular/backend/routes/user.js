import express from 'express';
import {getAllUsers, getById, updateUser, deleteUser } from '../controllers/user-controller.js'
import { verifyToken, verifyAdmin, verifyEnseignant } from "../utils/verifyToken.js";

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, getAllUsers);
router.get('/:id', verifyToken, getById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

export default router;