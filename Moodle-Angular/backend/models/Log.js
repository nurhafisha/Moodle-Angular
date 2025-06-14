import mongoose from "mongoose";

const UserActivityLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Object },
});

module.exports = mongoose.model("UserActivityLog", UserActivityLogSchema);
