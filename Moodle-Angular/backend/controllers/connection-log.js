import ConnectionLog from "../models/ConnectionLog.js";

export const getConnectionLog = async (req, res) => {
  try {
    const logs = await ConnectionLog.find().populate(
      "userId",
      "nom prenom email"
    );
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const createConnectionLog = async (req, res) => {
  try {
    const { userId, email, status, ip } = req.body;
    const log = await ConnectionLog.create({
      userId,
      email,
      status,
      ip,
      timestamp: new Date(),
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
// export const getUserConnectionLog = async (req, res) => {
//   try {
//     const logs = await ConnectionLog.find({ userId: req.params.userId });
//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };
