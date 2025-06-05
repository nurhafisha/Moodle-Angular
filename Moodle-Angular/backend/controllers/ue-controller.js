import UE from "../models/Ue.js";

// export const getAllUes = async (req, res, next) => {
//   try {
//     const ues = await Ue.find();
//     return next(CreateSuccess(200, "UEs récupérés avec succès", ues));
//   } catch (error) {
//     return next(CreateError(500, "Erreur interne du serveur!"));
//   }
// };

export const getAllUes = async (req, res) => {
  const ues = await Ue.find(); // ou ta logique pour lire le JSON
  res.status(200).json({ success: true, data: ues });
};

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

export const createUe = async (req, res) => {
  try {
    const { _id, titre_ue } = req.body;
    const ue = new UE({ _id, titre_ue });
    await ue.save();
    res.status(201).json({ success: true, data: ue });
  } catch (err) {
    console.error("Erreur lors de la création de l'UE :", err);
    res.status(500).json({
      message: "Erreur lors de la création de l'UE",
      error: err.message || err,
    });
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

    ue.cours.push({
      titre_cours,
      desc_cours,
      datetime_publier,
      fichier_joint,
    });

    await ue.save();

    const addedCours = ue.cours[ue.cours.length - 1];

    res.status(201).json(addedCours);
  } catch (err) {
    console.error("Erreur lors de la création du cours :", err);
    res
      .status(500)
      .json({ message: "Error creating Cours", error: err.message || err });
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

    ue.ressources.push({
      titre_ressource,
      desc_ressource,
      datetime_publier,
      fichier_joint,
    });

    await ue.save();

    const addedRessource = ue.ressources[ue.ressources.length - 1];

    res.status(201).json(addedRessource);
  } catch (err) {
    console.error("Erreur lors de la création du ressource :", err);
    res
      .status(500)
      .json({ message: "Error creating Ressource", error: err.message || err });
  }
};

export const createDevoir = async (req, res) => {
  try {
    const { titre_devoir, desc_devoir, datetime_debut, datetime_fin, depots } =
      req.body;

    const ue = await UE.findById(req.params.id);
    if (!ue) {
      return res.status(404).json({ message: "UE not found" });
    }

    ue.devoirs.push({
      titre_devoir,
      desc_devoir,
      datetime_debut,
      datetime_fin,
      depots,
    });

    await ue.save();

    const addedDevoir = ue.devoirs[ue.devoirs.length - 1];

    res.status(201).json(addedDevoir);
  } catch (err) {
    console.error("Erreur lors de la création du devoir :", err);
    res
      .status(500)
      .json({ message: "Error creating devoir", error: err.message || err });
  }
};
