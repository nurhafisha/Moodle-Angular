import mongoose , {Schema} from "mongoose";


const UserSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        
    },

    prenom: {
        type: String,
        required: true,    
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
        required: false,
        default: "https://w3schools.com/howto/img_avatar.png",
    },

    role: {
    type: String,
    enum: ['Etudiant', 'Enseignant', 'Admin'],
    required: true
    },
 
},
    {
    timestamps: true,
    }
)

export default mongoose.model("User", UserSchema);