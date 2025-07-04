import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import ueRoute from "./routes/ue.js";
import connectionLogRoute from "./routes/connection.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Page Express Server

const app = express();
dotenv.config();

//Middleware
app.use(express.json()); // pour parser les requêtes JSONs
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use("/backend/auth", authRoute);
app.use("/backend/user", userRoute);
app.use("/backend/ues", ueRoute);
app.use("/backend/connection-log", connectionLogRoute);
app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));

//Response handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isSuccess = [200, 201, 204].includes(statusCode);

  return res.status(statusCode).json({
    success: isSuccess,
    status: statusCode,
    message: err.message || (isSuccess ? "Success" : "Internal Server Error"),
    data: err.data || null,
  });
});

//DB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Demarrer le serveur
app.listen(8800, () => {
  connectMongoDB();
  console.log("Backend server is running on port 8800");
});
