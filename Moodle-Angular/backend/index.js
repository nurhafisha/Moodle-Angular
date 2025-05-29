import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from 'cors';


const app = express();
dotenv.config();

//Middleware
app.use(express.json()); // pour parser les requêtes JSONs
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use("/backend/auth", authRoute);
app.use("/backend/user" , userRoute);


//Response handling middleware
app.use((obj, req, res, next) => {
  const statusCode = obj.statusCode || 500;
  const isSuccess = [200, 201, 204].includes(statusCode);

  return res.status(statusCode).json({
    success: isSuccess,
    status: statusCode,
    message: obj.message || (isSuccess ? "Success" : "Internal Server Error"),
    data: obj.data || null,
  });
});

//DB connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); 
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); 
    }};

// api endpoints

app.use("/backend/auth", authRoute)

// demarrer les serveur
app.listen(8800, () => {
    connectMongoDB();
    console.log("Backend server is running on port 8800");
    });