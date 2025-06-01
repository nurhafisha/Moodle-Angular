import mongoose from "mongoose";

const reponseSchema = new mongoose.Schema({
  message: String,
  datetime_publier: Date,
});

const forumSchema = new mongoose.Schema({
  sujet: String,
  datetime_publier: Date,
  reponses: [reponseSchema],
});

const postSchema = new mongoose.Schema({
  titre_post: String,
  desc_post: String,
  datetime_publier: Date,
});

const devoirSchema = new mongoose.Schema({
  titre_devoir: String,
  datetime_debut: Date,
  datetime_fin: Date,
});

const ueSchema = new mongoose.Schema({
  _id: String,
  titre_ue: String,
  posts: [postSchema],
  forums: [forumSchema],
  devoirs: [devoirSchema],
});

export default mongoose.model("UE", ueSchema);