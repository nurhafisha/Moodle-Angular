import ConnectionLog from "../models/ConnectionLog.js";

export const getConnectionLog = async (req, res) => {
  try {
    const logs = await ConnectionLog.find()
      .populate("userId", "nom prenom email")
      .sort({ timestamp: -1 });

    // Filtrer pour ne garder qu'un log par minute par utilisateur
    const filteredLogs = [];
    const seen = {};

    logs.forEach((log) => {
      const user = log.userId?._id?.toString() || log.userId;
      const date = new Date(log.timestamp);
      const key = `${user}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
      if (!seen[key]) {
        filteredLogs.push(log);
        seen[key] = true;
      }
    });

    res.json(filteredLogs);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
