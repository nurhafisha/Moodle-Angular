import mongoose from "mongoose";

const reponseSchema = new mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  datetime_publier: Date,
});

const forumSchema = new mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sujet: String,
  datetime_publier: Date,
  reponses: [reponseSchema],
});

const coursSchema = new mongoose.Schema({
  titre_cours: String,
  desc_cours: String,
  datetime_publier: Date,
  fichier_joint: { type: String, default: null },
});

const ressourceSchema = new mongoose.Schema({
  titre_ressource: String,
  desc_ressource: String,
  datetime_publier: Date,
  fichier_joint: { type: String, default: null },
});

const depotSchema = new mongoose.Schema({
  id_etudiant: Number,
  fichier: { type: String, default: null },
  datetime: Date,
  etat: {
    type: String,
    enum: ["corrigé", "en attente", "refusé"],
    default: "en attente",
  },
  note: { type: Number, default: null },
  commentaire: { type: String, default: null },
});

const devoirSchema = new mongoose.Schema({
  titre_devoir: String,
  desc_devoir: String,
  datetime_debut: Date,
  datetime_fin: Date,
  depots: [depotSchema],
});

const ueSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  titre_ue: { type: String, required: true },
  enseignants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  image_ue: { type: String, default: null },
  cours: [coursSchema],
  ressources: [ressourceSchema],
  forums: [forumSchema],
  devoirs: [devoirSchema],
});

export default mongoose.model("UE", ueSchema);
