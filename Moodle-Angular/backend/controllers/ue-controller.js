import UE from "../models/Ue.js";

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
    console.error('Erreur lors de la création du cours :', err);
    res.status(500).json({ message: "Error creating Cours", error: err.message || err });
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
    console.error('Erreur lors de la création du ressource :', err);
    res.status(500).json({ message: "Error creating Ressource", error: err.message || err });
  }
};