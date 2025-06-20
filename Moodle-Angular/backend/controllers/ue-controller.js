import mongoose from "mongoose";
import { error } from "console";
import UE from "../models/Ue.js"; // Importe le modèle UE (Mongoose)

// Récupérer toutes les UEs
export const getAllUes = async (req, res) => {
  const ues = await UE.find(); // Récupère toutes les UEs depuis la base
  res
    .status(200)
    .json({ success: true, message: "UEs récupérés avec succès", data: ues }); // Renvoie la liste
};

export const getUesForUser = async (req, res, next) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    let ues;
    if (role === "Etudiant") {
      ues = await UE.find({ participants: userId });
    } else if (role === "Enseignant" || role === "Admin") {
      ues = await UE.find(); // ✅ fetch all UEs
    } else {
      return next(CreateError(403, "Unauthorized role"));
    }

    res.status(200).json({ success: true, data: ues });
  } catch (err) {
    next(CreateError(500, "Erreur serveur", err));
  }
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
    const { _id, titre_ue } = req.body;
    const image_ue = req.file ? req.file.path : null;
    const ue = new UE({ _id, titre_ue, image_ue });
    await ue.save();
    res.status(201).json({ success: true, data: ue });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création de l'UE",
      error: err.message,
    });
  }
};

// Modifier les champs des UE
export const updateUe = async (req, res) => {
  try {
    const { titre_ue } = req.body;
    let updateFields = { titre_ue };

    // Si une nouvelle image est uploadée
    if (req.file) {
      updateFields.image_ue = req.file.filename;
    } else if (req.body.image_ue === null || req.body.image_ue === "") {
      updateFields.image_ue = null;
    }

    const ue = await UE.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!ue) {
      return res.status(404).json({ message: "UE non trouvée" });
    }
    res.status(200).json({ success: true, data: ue });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de modification de l'UE",
      error: err.message || err,
    });
  }
};

// Supprimer une UE existante
export const deleteUe = async (req, res, next) => {
  try {
    const ue = await UE.findByIdAndDelete(req.params.id);

    if (!ue) {
      return next(CreateError(404, "UE non trouvée"));
    }

    return next(CreateSuccess(200, "UE suprimée!"));
  } catch (err) {
    console.error("Erreur lors de la suppression de l'UE :", err);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'UE",
      error: err.message || err,
    });
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

    const newDevoir = {
      _id: new mongoose.Types.ObjectId(),
      titre_devoir,
      desc_devoir,
      datetime_debut,
      datetime_fin,
      depots,
    }; // Ajoute le devoir à l'UE
    ue.devoirs.push(newDevoir);
    await ue.save(); // Sauvegarde l'UE modifiée

    res.status(201).json(newDevoir); // Renvoie notification de succes
  } catch (err) {
    console.error("Erreur lors de la création du devoir :", err);
    res
      .status(500)
      .json({ message: "Error creating devoir", error: err.message || err });
  }
};

export const deleteDevoir = async (req, res) => {
  try {
    const { id: ueId, devoirId } = req.params;

    const ue = await UE.findById(ueId);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    // verifier si Devoir existe
    const initialLength = ue.devoirs.length;
    ue.devoirs = ue.devoirs.filter((c) => c._id.toString() !== devoirId);

    if (ue.devoirs.length === initialLength) {
      return res.status(404).json({ message: "Devoir not found" });
    }

    await ue.save();

    res.status(200).json({ message: "Devoir deleted successfully", devoirId }); // Renvoie notification de succes
  } catch (err) {
    console.error("Erreur lors de la suppression du devoir :", err);
    res
      .status(500)
      .json({ message: "Error deleting Devoir", error: err.message || err });
  }
};

// Créer un forum
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
      reponses: [],
    };

    ue.forums.push(newMessage);
    await ue.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Erreur lors de la création du message forum :", err);
    res.status(500).json({
      message: "Error creating forum message",
      error: err.message || err,
    });
  }
};

// Créer une réponse de forum
export const createForumReply = async (req, res) => {
  try {
    const { reply, userId, datetime_publier } = req.body;
    const ueId = req.params.id;
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
    res
      .status(500)
      .json({ message: "Error creating reply", error: err.message || err });
  }
};

// export const getAllUe = async (req, res) => {
//   try {
//     const ues = await UE.find({}, "titre_ue image_ue _id"); // only needed fields
//     res.status(200).json(ues);
//   } catch (err) {
//     res.status(500).json({ message: "Error retrieving UEs", error: err });
//   }
// };

// Assigner des participants à une UE
export const assignParticipantsToUe = async (req, res) => {
  try {
    const { ueId, participantIds } = req.body;

    const ue = await UE.findById(ueId);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const objectIds = participantIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    ue.participants = objectIds;
    await ue.save();

    res.status(200).json({ message: "Participants updated", ue });
  } catch (err) {
    console.error("Erreur assignParticipants:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Récupérer une UE avec ses participants
export const getUeWithParticipants = async (req, res, next) => {
  try {
    const ue = await UE.findOne({ _id: req.params.id }).populate(
      "participants"
    );
    if (!ue) {
      return next({ statusCode: 404, message: "UE not found" });
    }
    next({ statusCode: 200, data: ue });
  } catch (error) {
    next({ statusCode: 500, message: "Error fetching UE", data: error });
  }
};

// Ajouter une section personnalisée
export const addCustomSection = async (req, res) => {
  const { ueId } = req.params;
  const { sectionName } = req.body;

  try {
    const ue = await UE.findById(ueId);
    if (!ue) return res.status(404).send("UE not found");

    if (!ue.customSections.includes(sectionName)) {
      ue.customSections.push(sectionName);
      await ue.save();
    }

    res.status(200).json(ue.customSections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajouter un Post dans section personnalisée
export const addCustomPost = async (req, res) => {
  const { titre, desc, datetime_publier, section } = req.body;
  const fichier_joint = req.file ? `uploads/${req.file.filename}` : null; // Fichier joint si uploadé

  try {
    const ue = await UE.findById(req.params.ueId);
    if (!ue) return res.status(404).send("UE not found");

    if (!ue.customSections.includes(section)) {
      return res.status(400).json({ message: "Section not registered." });
    }

    const newPost = {
      _id: new mongoose.Types.ObjectId(),
      section,
      titre,
      desc,
      fichier_joint,
      datetime_publier,
    }; // Ajoute le custom post à l'UE

    ue.customPosts.push(newPost);
    await ue.save(); // Sauvegarde l'UE modifiée

    res.status(201).json(newPost); // Renvoie notification de succes
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un Post dans section personnalisée
export const deleteCustom = async (req, res) => {
  try {
    const { id: ueId, customId } = req.params;

    const ue = await UE.findById(ueId);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    const initialLength = ue.customPosts.length;
    ue.customPosts = ue.customPosts.filter(
      (c) => c._id.toString() !== customId
    );

    if (ue.customPosts.length === initialLength) {
      return res.status(404).json({ message: "Post not found" });
    }

    await ue.save();

    res.status(200).json({ message: "Post deleted successfully", customId });
  } catch (err) {
    console.error("Erreur lors de la suppression du Post :", err);
    res
      .status(500)
      .json({ message: "Error deleting Post", error: err.message || err });
  }
};

// ----------------------------------------- Section Devoirs : Fisha -----------------------------------------

// Recuperer les devoir d'une UE
export const getDevoirsByUeId = async (req, res, next) => {
  try {
    const ue = await UE.findById(req.params.id);
    if (!ue) {
      return next({ statusCode: 404, message: "UE not found" });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Devoirs retrieved",
      data: ue.devoirs,
    });
  } catch (error) {
    return next({
      statusCode: 500,
      message: "Error fetching devoirs",
      data: error,
    });
  }
};

// Submission d'un devoir par Etudiant :
export const submitDepot = async (req, res, next) => {
  try {
    const { ueId, devoirId } = req.params; // Récupère l'ID de l'UE et du devoir
    const studentId = new mongoose.Types.ObjectId(req.user.id);
    const file = req.file; // Récupère le fichier uploadé

    if (!file) {
      console.log("⚠️ No file was uploaded.");
    } else {
      console.log("✅ File saved:", file.path);
    }

    const ue = await UE.findById(ueId); // Cherche l'UE par ID
    if (!ue) {
      return next({ statusCode: 404, message: "UE not found" }); // Si l'UE n'existe pas
    }
    const devoir = ue.devoirs.id(devoirId); // Cherche le devoir par ID
    if (!devoir) {
      return next({ statusCode: 404, message: "Devoir not found" }); // Si le devoir n'existe pas
    }

    const isLate = new Date() > new Date(devoir.datetime_fin); // Vérifie si

    const newDepot = {
      id_etudiant: studentId,
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      taille: file.size,
      type: file.mimetype,
      datetime: new Date(),
      etat: "en attente",
      note: null,
      commentaire: req.body.commentaire || null,
    };

    devoir.depots.push(newDepot); // Ajoute le dépôt au devoir

    await ue.save(); // Sauvegarde l'UE modifiée

    res.status(201).json({ message: "Depot submitted", depot: newDepot });
  } catch (error) {
    return next({
      statusCode: 500,
      message: "Error lors du dépôt",
      data: error,
    });
  }
};

// ----------------------------------------- Section notez devoirs : Fisha -----------------------------------------

export const getDepotForGrading = async (req, res, next) => {
  try {
    const { ueId, devoirId } = req.params;
    const ue = await UE.findById(ueId).populate("devoirs.depots.id_etudiant");
    // Populate aider de remplir les informations de l'étudiant dans les dépôts (pas id seulement)

    if (!ue) {
      return next({ statusCode: 404, message: "UE not found" });
    }

    const devoir = ue.devoirs.id(devoirId);
    if (!devoir) {
      return next({ statusCode: 404, message: "Devoir not found" });
    }

    const depots = devoir.depots || [];
    res.status(200).json({
      success: true,
      status: 200,
      message: "Depots retrieved for grading",
      data: depots,
    });
  } catch (error) {
    return next({
      statusCode: 500,
      message: "Erreur lors de la récupération du dépôt pour notation",
      data: error,
    });
  }
};

export const updateDepotForGrading = async (req, res, next) => {
  try {
    const { ueId, devoirId, depotId } = req.params;
    const { note, commentaire, etat } = req.body; // Récupère les champs du body

    const ue = await UE.findById(ueId);
    if (!ue) return next({ statusCode: 404, message: "UE not found" }); // Si l'UE n'existe pas

    const devoir = ue.devoirs.id(devoirId);
    if (!devoir) return next({ statusCode: 404, message: "Devoir not found" }); // Si le devoir n'existe pas

    const depot = devoir.depots.id(depotId);
    if (!depot) return next({ statusCode: 404, message: "Depot not found" }); // Si le dépôt n'existe pas
    // Met à jour les champs du dépôt
    depot.note = note; // Met à jour la note si fournie
    depot.commentaire = commentaire; // Met à jour le commentaire si fourni
    depot.etat = etat; // Met à jour l'état si fourni

    await ue.save(); // Sauvegarde l'UE modifiée

    // Renvoie une réponse de succès
    res.status(200).json({
      success: true,
      status: 200,
      message: "Depot updated successfully",
      data: {
        titre_devoir: devoir.titre_devoir,
        depots: devoir.depots || [],
      },
    });
  } catch (error) {
    return next({
      statusCode: 500,
      message: "Erreur lors de la mise à jour du dépôt pour notation",
      data: error,
    });
  }
};

// Pour recuperer les details d'un devoir spécifique
export const getDevoirDetails = async (req, res, next) => {
  try {
    const { ueId, devoirId } = req.params;
    const ue = await UE.findById(ueId);

    if (!ue) return next({ statusCode: 404, message: "UE not found" });

    const devoir = ue.devoirs.id(devoirId);
    if (!devoir) return next({ statusCode: 404, message: "Devoir not found" });

    res.status(200).json({
      success: true,
      data: {
        titre_devoir: devoir.titre_devoir,
        desc_devoir: devoir.desc_devoir,
        datetime_fin: devoir.datetime_fin,
        depots: devoir.depots,
      },
    });
  } catch (error) {
    return next({ statusCode: 500, message: "Erreur serveur", data: error });
  }
};
