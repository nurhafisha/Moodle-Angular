import express from "express";
import multer from "multer";
import {
  verifyToken,
  verifyEtudiant,
  verifyEnseignant,
} from "../utils/verifyToken.js";

import {
  getAllUes, // Contrôleur pour récupérer toutes les UEs
  getUeById, // Contrôleur pour récupérer une UE par son id
  createUe, // Contrôleur pour créer une nouvelle UE
  updateUe,
  createDevoir, // Contrôleur pour créer un nouveau devoir
  deleteUe, // Contrôleur pour créer un nouveau devoir
  deleteDevoir, // Contrôleur pour supprimer un devoir
  createForumMessage, // Contrôleur créer un nouveau message au forum
  createForumReply, // // Contrôleur créer un nouveau réponse de message au forum
  getUeWithParticipants, // Contrôleur pour récupérer une UE avec ses participants
  assignParticipantsToUe, // Contrôleur pour assigner des participants à une UE
  getDepotForGrading, // Contrôleur pour récupérer un dépôt pour la notation
  submitDepot,
  updateDepotForGrading,
  getDevoirDetails,
  addCustomSection,
  addCustomPost,
  deleteCustom
} from "../controllers/ue-controller.js"; // Importe les fonctions du contrôleur

// Crée un nouveau routeur express
const router = express.Router();

// Multer config for fichier_joint files (Custom post files)
const fichierPostStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/fichier-post/"); // Dossier de destination des fichiers uploadés
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname; // Génère un nom de fichier unique
    cb(null, uniqueName); // Définit le nom du fichier uploadé
  },
});

// Multer config for image_ue files (UE images)
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/image-asset/"); // Dossier de destination des images uploadés
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// Middleware for fichier_joint : Initialiser multer
const uploadPostFile = multer({ storage: fichierPostStorage});

// Middleware for image_ue
const uploadImage = multer({ storage: imageStorage });

router.get("/", getAllUes); // Route pour récupérer toutes les UEs

router.post("/", uploadImage.single("image_ue"), createUe); // Route pour créer une nouvelle UE

router.get("/:id", getUeById); // Route pour récupérer une UE par son id

router.patch("/:id", uploadImage.single("image_ue"), updateUe); // Route pour modifier certains champs d'une UE

router.delete("/:id", deleteUe); // Route pour supprimer une UE par son id(code UE)

// Route pour créer un nouveau devoir avec upload de fichier
router.post("/new-devoir/:id", uploadPostFile.single("fichier_joint"), createDevoir);
router.delete("/:id/devoir/:devoirId", deleteDevoir);
router.post("/new-forum/:id", createForumMessage);
router.post("/new-reply/:id/:forumId", createForumReply);

// Route pour récupérer une UE avec ses étudiants
router.get('/with-participants/:id', getUeWithParticipants);
router.post('/assign-participants', assignParticipantsToUe);

// Route pour submettre un devoir
router.post(
  "/:ueId/devoirs/:devoirId/depots",
  verifyToken,
  verifyEtudiant,
  uploadPostFile.single("file"),
  submitDepot
);

// Route pour notez un devoir
router.get(
  "/:ueId/devoirs/:devoirId/grade-devoir",
  verifyToken,
  verifyEnseignant,
  getDepotForGrading
);
router.put(
  "/:ueId/devoirs/:devoirId/depots/:depotId",
  verifyToken,
  verifyEnseignant,
  updateDepotForGrading
);
// Route: GET /ues/:ueId/devoirs/:devoirId
router.get("/:ueId/devoirs/:devoirId", verifyToken, getDevoirDetails);

// Ajouter une section personnalisée
router.post('/:ueId/custom-section', addCustomSection);
// Ajouter un Post dans section personnalisée
router.post('/:ueId/custom-post',uploadPostFile.single("fichier_joint"), addCustomPost);
// Supprimer un Post dans section personnalisée
router.delete("/:id/custom/:customId", deleteCustom);

export default router; // Exporte le routeur pour l'utiliser dans l'application principale
