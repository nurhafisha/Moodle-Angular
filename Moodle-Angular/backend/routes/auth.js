import express from 'express';
import {register , login} from '../controllers/auth-controller.js';
import {verifyToken , verifyAdmin} from '../utils/verifyToken.js'

const router = express.Router();

// S'inscrire
router.post('/register', register);

//login 
router.post('/login', login )

router.get('/espace-admin', verifyToken, verifyAdmin);

export default router;