import jwt from 'jsonwebtoken';

// utils/auth.js
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(CreateError(401, "Not authenticated!"));
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(CreateError(403, "Invalid token!"));
    req.user = decoded; // { id, role }
    next();
  });
};


export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return next(CreateError(403, "Admin access required!"));
  }
  next();
};

export const verifyEnseignant = (req, res, next) => {
  if (req.user.role !== "Enseignant") {
    return next(CreateError(403, "Enseignant access required!"));
  }
  next();
};

export const verifyEtudiant = (req, res, next) => {
  if (req.user.role !== "Etudiant") {
    return next(CreateError(403, "Etudiant access required!"));
  }
  next();
};