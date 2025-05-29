import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { CreateError, CreateSuccess } from "../utils/responseHandler.js";
import jwt from 'jsonwebtoken';

// auth-controller : #login , register controller backend

// Fonction pour enregistrer un nouvel utilisateur
export const register = async (req, res , next) => {

    try{
    console.log("Incoming registration data:", req.body); // Debug (pour verifier sur le terminal)
    // Chiffrer le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture || "https://w3schools.com/howto/img_avatar.png",
        role: req.body.role 
    });

    await newUser.save() //pour enregistre sur mongoDB
    return next(CreateSuccess(201, "User registered successfully", newUser));
    } catch (error) {
    return next(CreateError(500, "Registration failed", error));
    }

}

// Fonction Login
export const login = async (req, res , next) => {

    try {
        
        const user = await User.findOne({ email: req.body.email });

        if(!user) {
            return next(CreateError(404, "User not found"));
        }

        // check if password correct 
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordValid) {
            return next(CreateError(401, "Invalid password"));
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, // payload
            process.env.JWT_SECRET,            // secret key from .env                 
        );

        res.cookie("access_token" , token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login Successful",
            data: user
        })
    }
    catch (error) {
       return next(CreateError(500, "Login failed", error));
    }
}

