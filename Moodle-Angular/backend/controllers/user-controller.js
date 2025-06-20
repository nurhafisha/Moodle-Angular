import User from "../models/User.js";
import { CreateError, CreateSuccess } from "../utils/responseHandler.js";
import {
  verifyToken,
  verifyAdmin,
  verifyEnseignant,
} from "../utils/verifyToken.js";
import bcrypt from "bcrypt";

/**
 * Creer un utilisateur
 */
export const createUser = async (req, res) => {
  try {
    const { nom, prenom, email, password, role } = req.body;
    // mot de pass hashed avant la sauvegarde
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
      profilePicture:
        req.body.profilePicture || "https://w3schools.com/howto/img_avatar.png",
    });
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: err.message,
    });
  }
};

/**
 * Obtenir tous les utilisateurs
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").populate("role"); // On ne renvoie pas le mot de passe
    return next(
      CreateSuccess(200, "Utilisateurs récupérés avec succès", users)
    );
  } catch (error) {
    return next(CreateError(500, "Erreur interne du serveur!"));
  }
};

/**
 *  Obtenir un utilisateur par identifiant
 * - Autorisé si l'utilisateur est :
 * - Administrateur
 * - Enseignant
 * - Lui-même
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("role");

    if (!user) {
      return next(CreateError(404, "User not found"));
    }

    if (
      req.user.role !== "Admin" &&
      req.user.role !== "Enseignant" &&
      req.user.id !== req.params.id
    ) {
      return next(CreateError(403, "Unauthorized access"));
    }

    return next(CreateSuccess(200, "User retrieved successfully", user));
  } catch (error) {
    return next(CreateError(500, "Internal server error!"));
  }
};

/**
 *  Obtenir le profil de l'utilisateur actuellement connecté:
 * - Utilise le paramètre req.user défini par le middleware verifyToken
 */

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(CreateError(404, "Utilisateur non trouvé"));
    return next(
      CreateSuccess(200, "Profil utilisateur récupéré avec succès", user)
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/**
 *  Mettre à jour le profil utilisateur
 * - Seul l'administrateur ou l'utilisateur lui-même peut effectuer la mise à jour.
 * - Le mot de passe est re-haché s'il est présent.
 * - Utilise les données de FormData (traitées par Multer).
 */

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(CreateError(404, "User not found"));

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } else {
      delete req.body.password;
    }

    if (req.user.role !== "Admin" && req.user.id !== req.params.id) {
      return next(CreateError(403, "Unauthorized access"));
    }

    if (req.file) {
      req.body.profilePicture = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    return next(CreateSuccess(200, "User updated successfully", updatedUser));
  } catch (error) {
    return next(CreateError(500, "Internal server error!"));
  }
};

/**
 * Supprimer l'utilisateur
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(CreateError(404, "User not found"));
    }

    return next(CreateSuccess(200, "User deleted successfully"));
  } catch (error) {
    return next(CreateError(500, "Internal server error!"));
  }
};
