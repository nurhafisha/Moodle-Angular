import jwt from 'jsonwebtoken';
import { CreateError } from '../utils/responseHandler.js';

// ============================
// Middleware: Verify JWT Token
// ============================

export const verifyToken = (req, res, next) => {
  
  // Extraire le token de l'en-tête d'autorisation (par exemple, « Bearer <token> »)
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // Si aucun token n'est fourni, bloquer l'accès
  if (!token) {return next(CreateError(401, "Not authenticated!"));}

  // Vérifiez le token à l'aide de la clé secrète de .env
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // Si la vérification échoue (par exemple, expirée, non valide), refuser l'accès
    if (err) { return next(CreateError(403, "Invalid token!"));}
    req.user = decoded;
    next(); // Passer au middleware ou au gestionnaire de route suivant
  });
};

// ============================
// Middleware : Vérification des rôles - Administrateur
// ============================
export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return next(CreateError(403, "Admin access required!"));
  }
  next();
};

// ============================
// Middleware : Vérification des rôles - Enseignant
// ============================
export const verifyEnseignant = (req, res, next) => {
  if (req.user.role !== "Enseignant") {
    return next(CreateError(403, "Enseignant access required!"));
  }
  next();
};

// ============================
// Middleware : Vérification des rôles - Étudiant
// ============================
export const verifyEtudiant = (req, res, next) => {
  if (req.user.role !== "Etudiant") {
    return next(CreateError(403, "Etudiant access required!"));
  }
  next();
};