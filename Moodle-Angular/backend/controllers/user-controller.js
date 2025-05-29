import User from '../models/User.js';
import { CreateError, CreateSuccess } from "../utils/responseHandler.js";
import { verifyToken, verifyAdmin, verifyEnseignant } from "../utils/verifyToken.js";

// user-controller : # getAllUsers, getById, updateUser, deleteUser

// Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
    try {
        // Only Admin can access all users
        const users = await User.find().select('-password').populate('role');
        return next(CreateSuccess(200, "Users retrieved successfully", users));
    } catch (error) {
        return next(CreateError(500, "Internal server error!"));
    }
};

// Get user by ID (Admin, Enseignant, or self)
export const getById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password').populate('role');
        
        if (!user) {
            return next(CreateError(404, "User not found"));
        }

        // Allow access if:
        // 1. User is Admin
        // 2. User is Enseignant
        // 3. User is requesting their own profile
        if (req.user.role !== "Admin" && 
            req.user.role !== "Enseignant" && 
            req.user.id !== req.params.id) {
            return next(CreateError(403, "Unauthorized access"));
        }

        return next(CreateSuccess(200, "User retrieved successfully", user));
    } catch (error) {
        return next(CreateError(500, "Internal server error!"));
    }
};

// Update user (Admin or self)
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return next(CreateError(404, "User not found"));
        }

        // Only allow updates if:
        // 1. User is Admin
        // 2. User is updating their own profile
        if (req.user.role !== "Admin" && req.user.id !== req.params.id) {
            return next(CreateError(403, "Unauthorized access"));
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).select('-password');

        return next(CreateSuccess(200, "User updated successfully", updatedUser));
    } catch (error) {
        return next(CreateError(500, "Internal server error!"));
    }
};

// Delete user (Admin only)
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return next(CreateError(404, "User not found"));
        }

        return next(CreateSuccess(200, "User deleted successfully"));
    } catch (error) {
        return next(CreateError(500, "Internal server error!"));
    }
};