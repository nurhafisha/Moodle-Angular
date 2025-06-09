import express from "express";
import multer from "multer"; // Importe le module multer pour la gestion des fichiers uploadés
import {
  getAllUes, // Contrôleur pour récupérer toutes les UEs
  getUeById, // Contrôleur pour récupérer une UE par son id
  createUe, // Contrôleur pour créer une nouvelle UE
  createCours, // Contrôleur pour créer un nouveau cours
  createRessource, // Contrôleur pour créer une nouvelle ressource
  createDevoir,
  deleteUe, // Contrôleur pour créer un nouveau devoir
} from "../controllers/ue-controller.js"; // Importe les fonctions du contrôleur

// Crée un nouveau routeur express
const router = express.Router();

// Configuration du stockage des fichiers avec multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Dossier de destination des fichiers uploadés
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname; // Génère un nom de fichier unique
    cb(null, uniqueName); // Définit le nom du fichier uploadé
  },
});

// Initialise multer avec la configuration de stockage
const upload = multer({ storage: storage });

router.get("/", getAllUes); // Route pour récupérer toutes les UEs

router.post("/", createUe); // Route pour créer une nouvelle UE

router.get("/:id", getUeById); // Route pour récupérer une UE par son id

router.delete("/:id", deleteUe); // Route pour supprimer une UE par son id(code UE)

// Route pour créer un nouveau cours avec upload de fichier
router.post("/new-cours/:id", upload.single("fichier_joint"), createCours);

// Route pour créer une nouvelle ressource avec upload de fichier
router.post(
  "/new-ressource/:id",
  upload.single("fichier_joint"),
  createRessource
);

// Route pour créer un nouveau devoir avec upload de fichier
router.post("/new-devoir/:id", upload.single("fichier_joint"), createDevoir);

export default router; // Exporte le routeur pour l'utiliser dans l'application principale
