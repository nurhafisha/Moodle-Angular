import UE from "../models/Ue.js";
import mongoose from 'mongoose';

export const getUeById = async (req, res, next) => {
  try {
    const ue = await UE.findOne({ _id: req.params.id });
    if (!ue) {
      return next({ statusCode: 404, message: "UE not found" });
    }

    next({ statusCode: 200, data: ue });
  } catch (error) {
    next({ statusCode: 500, message: "Error fetching UE", data: error });
  }
};

export const createCours = async (req, res) => {
  try {
    const { titre_cours, desc_cours, datetime_publier } = req.body;
    const fichier_joint = req.file ? `uploads/${req.file.filename}` : null;

    const ue = await UE.findById(req.params.id);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const newCours = {
      _id: new mongoose.Types.ObjectId(),
      titre_cours,
      desc_cours,
      datetime_publier,
      fichier_joint,
    };

    ue.cours.push(newCours);
    await ue.save();

    res.status(201).json(newCours); 
  } catch (err) {
    console.error('Erreur lors de la création du cours :', err);
    res.status(500).json({ message: "Error creating Cours", error: err.message || err });
  }
};

export const deleteCours = async (req, res) => {
  try {
    const { id: ueId, coursId } = req.params;

    const ue = await UE.findById(ueId);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const initialLength = ue.cours.length;
    ue.cours = ue.cours.filter(c => c._id.toString() !== coursId);

    if (ue.cours.length === initialLength) {
      return res.status(404).json({ message: "Cours not found" });
    }

    await ue.save();

    res.status(200).json({ message: "Cours deleted successfully", coursId });
  } catch (err) {
    console.error('Erreur lors de la suppression du cours :', err);
    res.status(500).json({ message: "Error deleting Cours", error: err.message || err });
  }
};

export const createRessource = async (req, res) => {
  try {
    const { titre_ressource, desc_ressource, datetime_publier } = req.body;
    const fichier_joint = req.file ? `uploads/${req.file.filename}` : null;

    const ue = await UE.findById(req.params.id);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const newRessource = ({
      _id: new mongoose.Types.ObjectId(),
      titre_ressource,
      desc_ressource,
      datetime_publier,
      fichier_joint,
    });

    ue.ressources.push(newRessource);
    await ue.save();

    res.status(201).json(newRessource);
  } catch (err) {
    console.error('Erreur lors de la création du ressource :', err);
    res.status(500).json({ message: "Error creating Ressource", error: err.message || err });
  }
};

export const deleteRessource = async (req, res) => {
  try {
    const { id: ueId, ressourceId } = req.params;

    const ue = await UE.findById(ueId);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const initialLength = ue.ressources.length;
    ue.ressources = ue.ressources.filter(c => c._id.toString() !== ressourceId);

    if (ue.ressources.length === initialLength) {
      return res.status(404).json({ message: "Ressource not found" });
    }

    await ue.save();

    res.status(200).json({ message: "Ressource deleted successfully", ressourceId });
  } catch (err) {
    console.error('Erreur lors de la suppression du ressource :', err);
    res.status(500).json({ message: "Error deleting Ressource", error: err.message || err });
  }
};

export const createDevoir = async (req, res) => {
  try {
    const { titre_devoir, desc_devoir, datetime_debut, datetime_fin, depots } = req.body;

    const ue = await UE.findById(req.params.id);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const newDevoir = ({
      _id: new mongoose.Types.ObjectId(),
      titre_devoir,
      desc_devoir,
      datetime_debut,
      datetime_fin,
      depots
    });
    ue.devoirs.push(newDevoir);
    await ue.save();

    res.status(201).json(newDevoir);
  } catch (err) {
    console.error('Erreur lors de la création du devoir :', err);
    res.status(500).json({ message: "Error creating devoir", error: err.message || err });
  }
};

export const deleteDevoir = async (req, res) => {
  try {
    const { id: ueId, devoirId } = req.params;

    const ue = await UE.findById(ueId);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const initialLength = ue.devoirs.length;
    ue.devoirs = ue.devoirs.filter(c => c._id.toString() !== devoirId);

    if (ue.devoirs.length === initialLength) {
      return res.status(404).json({ message: "Devoir not found" });
    }

    await ue.save();

    res.status(200).json({ message: "Devoir deleted successfully", devoirId });
  } catch (err) {
    console.error('Erreur lors de la suppression du devoir :', err);
    res.status(500).json({ message: "Error deleting Devoir", error: err.message || err });
  }
};

export const createForumMessage = async (req, res) => {
  try {
    const { sujet, userId, datetime_publier } = req.body;

    const ue = await UE.findById(req.params.id);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const newMessage = {
      _id: new mongoose.Types.ObjectId(),
      sujet,
      id_user: userId,
      datetime_publier: datetime_publier || new Date().toISOString(),
      reponses: []
    };

    ue.forums.push(newMessage);
    await ue.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Erreur lors de la création du message forum :', err);
    res.status(500).json({ message: "Error creating forum message", error: err.message || err });
  }
};

export const createForumReply = async (req, res) => {
  try {
    const { reply, userId, datetime_publier } = req.body;
    const ueId = req.params.id
    const forumId = req.params.forumId;

    const ue = await UE.findById(ueId);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const forum = ue.forums.id(forumId);
    if (!forum) {
      return res.status(404).json({ message: "Forum message not found" });
    }

    const newReply = {
      id_user: userId,
      message: reply,
      datetime_publier: datetime_publier || new Date().toISOString(),
    };

    forum.reponses.push(newReply);
    await ue.save();

    res.status(201).json(newReply);
  } catch (err) {
    console.error("Erreur lors de la création de la réponse :", err);
    res.status(500).json({ message: "Error creating reply", error: err.message || err });
  }
};
