import mongoose, { Schema } from "mongoose";
import validator from "validator";

// Schema for the User
const UserSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },

    prenom: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Entrer une adresse email valide"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "La longueur minimale du mot de passe est de 6 "],
    },

    profilePicture: {
      type: String,
      required: false,
      default: "https://w3schools.com/howto/img_avatar.png",
    },

    role: {
      type: String,
      enum: ["Etudiant", "Enseignant", "Admin"],
      required: true,
    },

    listeUe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
