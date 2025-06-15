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
  id_etudiant: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},
  originalname: String,      // "report.pdf"
  filename: String,          // "file-1718xxxxxx.pdf"
  path: String,              // e.g., "uploads/file-1718xxxxxx.pdf"
  taille: Number,            // file size in bytes
  type: String,              // MIME type
  datetime: {
    type: Date,
    default: Date.now
  },
  etat: {
    type: String,
    enum: ["corrigé", "en attente" ],
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

const customPostSchema = new mongoose.Schema({
  section: { type: String, required: true },
  titre: { type: String, required: true },
  desc: { type: String },
  datetime_publier: { type: Date, default: Date.now },
  fichier_joint: { type: String }
});

const ueSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  titre_ue: { type: String, required: true },
  image_ue: { type: String, default: null },
  cours: [coursSchema],
  ressources: [ressourceSchema],
  forums: [forumSchema],
  devoirs: [devoirSchema],
  customSections: [String],   // noms de section personnalisées
  customPosts: [customPostSchema]   // les publications des sections personnalisées
});

export default mongoose.model("UE", ueSchema);
