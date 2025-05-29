import express from 'express';
import {register , login} from '../controllers/auth-controller.js';

const router = express.Router();

// S'inscrire
router.post('/register', register);

//login 
router.post('/login', login )

export default router;