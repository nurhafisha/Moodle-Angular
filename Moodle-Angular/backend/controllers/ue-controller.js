import { error } from "console";
import UE from "../models/Ue.js"; // Importe le modèle UE (Mongoose)

// Récupérer toutes les UEs
export const getAllUes = async (req, res) => {
  const ues = await UE.find(); // Récupère toutes les UEs depuis la base
  res.status(200).json({ success: true, data: ues }); // Renvoie la liste
};

// Récupérer une UE par son ID
export const getUeById = async (req, res, next) => {
  try {
    const ue = await UE.findOne({ _id: req.params.id }); // Cherche l'UE par ID
    if (!ue) {
      return next({ statusCode: 404, message: "UE not found" }); // Si non trouvée
    }
    next({ statusCode: 200, data: ue }); // Passe l'UE trouvée au middleware suivant
  } catch (error) {
    next({ statusCode: 500, message: "Error fetching UE", data: error }); // Gestion erreur
  }
};

// Créer une nouvelle UE
export const createUe = async (req, res) => {
  try {
    const { _id, titre_ue } = req.body; // Récupère les champs du body
    const ue = new UE({ _id, titre_ue }); // Crée une nouvelle instance UE
    await ue.save(); // Sauvegarde dans la base
    res.status(201).json({ success: true, data: ue }); // Renvoie l'UE créée
  } catch (err) {
    console.error("Erreur lors de la création de l'UE :", err); // Log erreur
    res.status(500).json({
      message: "Erreur lors de la création de l'UE",
      error: err.message || err,
    });
  }
};

// Supprimer une UE existante
export const deleteUe = async (req, res) => {
  try {
    const ue = await UE.findByIdAndDelete(req.params.id);

    if (!ue) {
      return res.status(404).json({ message: "UE non trouvée" });
    }

    return res.status(200).json({ message: "UE supprimée !" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'UE :", err);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'UE",
      error: err.message || err,
    });
  }
};

// Ajouter un cours à une UE existante
export const createCours = async (req, res) => {
  try {
    const { titre_cours, desc_cours, datetime_publier } = req.body; // Champs du cours
    const fichier_joint = req.file ? `uploads/${req.file.filename}` : null; // Fichier joint si uploadé

    const ue = await UE.findById(req.params.id); // Cherche l'UE par ID
    if (!ue) {
      return res.status(404).json({ message: "UE not found" }); // Si non trouvée
    }

    ue.cours.push({
      titre_cours,
      desc_cours,
      datetime_publier,
      fichier_joint,
    }); // Ajoute le cours à l'UE

    await ue.save(); // Sauvegarde l'UE modifiée

    const addedCours = ue.cours[ue.cours.length - 1]; // Récupère le cours ajouté

    res.status(201).json(addedCours); // Renvoie le cours ajouté
  } catch (err) {
    console.error("Erreur lors de la création du cours :", err);
    res
      .status(500)
      .json({ message: "Error creating Cours", error: err.message || err });
  }
};

// Ajouter une ressource à une UE existante
export const createRessource = async (req, res) => {
  try {
    const { titre_ressource, desc_ressource, datetime_publier } = req.body; // Champs de la ressource
    const fichier_joint = req.file ? `uploads/${req.file.filename}` : null; // Fichier joint si uploadé

    const ue = await UE.findById(req.params.id); // Cherche l'UE par ID
    if (!ue) {
      return res.status(404).json({ message: "UE not found" }); // Si non trouvée
    }

    ue.ressources.push({
      titre_ressource,
      desc_ressource,
      datetime_publier,
      fichier_joint,
    }); // Ajoute la ressource à l'UE

    await ue.save(); // Sauvegarde l'UE modifiée

    const addedRessource = ue.ressources[ue.ressources.length - 1]; // Récupère la ressource ajoutée

    res.status(201).json(addedRessource); // Renvoie la ressource ajoutée
  } catch (err) {
    console.error("Erreur lors de la création du ressource :", err);
    res
      .status(500)
      .json({ message: "Error creating Ressource", error: err.message || err });
  }
};

// Ajouter un devoir à une UE existante
export const createDevoir = async (req, res) => {
  try {
    const { titre_devoir, desc_devoir, datetime_debut, datetime_fin, depots } =
      req.body; // Champs du devoir

    const ue = await UE.findById(req.params.id); // Cherche l'UE par ID
    if (!ue) {
      return res.status(404).json({ message: "UE not found" }); // Si non trouvée
    }

    ue.devoirs.push({
      titre_devoir,
      desc_devoir,
      datetime_debut,
      datetime_fin,
      depots,
    }); // Ajoute le devoir à l'UE

    await ue.save(); // Sauvegarde l'UE modifiée

    const addedDevoir = ue.devoirs[ue.devoirs.length - 1]; // Récupère le devoir ajouté

    res.status(201).json(addedDevoir); // Renvoie le devoir ajouté
  } catch (err) {
    console.error("Erreur lors de la création du devoir :", err);
    res
      .status(500)
      .json({ message: "Error creating devoir", error: err.message || err });
  }
};

export const getAllUe = async (req, res) => {
  try {
    const ues = await UE.find({}, "titre_ue image_ue _id"); // only needed fields
    res.status(200).json(ues);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving UEs", error: err });
  }
};
