import mongoose from "mongoose";

const connectionLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: String,
  status: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("ConnectionLog", connectionLogSchema);
