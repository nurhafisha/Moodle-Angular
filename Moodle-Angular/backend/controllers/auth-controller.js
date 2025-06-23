import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { CreateError, CreateSuccess } from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";
import ConnectionLog from "../models/ConnectionLog.js";

/**
 * Enregistrer un nouvel utilisateur
 * - Valider et hacher le mot de passe
 * - Créer un nouveau document utilisateur
 * - L'enregistrer dans MongoDB
 */

export const register = async (req, res, next) => {
  try {
    // Verifier password
    if (!req.body.password || req.body.password.length < 6) {
      return next(
        CreateError(400, "Le mot de passe doit contenir au moins 6 caractères")
      );
    }

    // Chiffrer le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Créer une nouvelle instance utilisateur
    const newUser = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hashedPassword,
      profilePicture:
        req.body.profilePicture || "https://w3schools.com/howto/img_avatar.png",
      role: req.body.role,
    });

    // Pour enregistre sur mongoDB
    await newUser.save();
    return next(
      CreateSuccess(201, "Utilisateur enregistré avec succès", newUser)
    );
  } catch (error) {
    return next(CreateError(500, "L'inscription a échoué", error));
  }
};

/**
 *  Connexion d'un utilisateur:
 * - Vérification de l'adresse e-mail et du mot de passe
 * - Émission d'un jeton JWT
 * - Renvoie le jeton et les informations de l'utilisateur (sans mot de passe)
 */
export const login = async (req, res, next) => {
  try {
    // Rechercher un utilisateur par e-mail
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(CreateError(404, "User not found"));
    }

    // Comparez le mot de passe saisi avec le mot de passe haché
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return next(CreateError(401, "Invalid password"));
    }
    // Créer un jeton JWT avec l'ID utilisateur et le rôle comme charge utile
    const token = jwt.sign(
      { id: user._id, role: user.role }, // payload
      process.env.JWT_SECRET // secret key from .env
    );

    const email = req.body.email;
    const lastLog = await ConnectionLog.findOne({ userId: user._id })
      .sort({ timestamp: -1 })
      .lean();

    const now = Date.now();
    const lastTimestamp = lastLog?.timestamp
      ? new Date(lastLog.timestamp).getTime()
      : 0;

    // Empêcher si moins de 10 secondes
    if (!lastLog || now - lastTimestamp > 10000) {
      await ConnectionLog.create({
        userId: user._id,
        email: user.email,
        status: "success",
        timestamp: new Date(),
      });
      console.log("Connexion log créée");
    } else {
      console.log("Connexion déjà enregistrée récemment, pas de doublon.");
    }

    /// Renvoie le jeton et les données utilisateur (le mot de passe n'est pas inclus)
    res.status(200).json({
      status: 200,
      message: "Login Réussi",
      token: token,
      data: user,
    });
  } catch (error) {
    return next(CreateError(500, "Login échoué", error));
  }
};
