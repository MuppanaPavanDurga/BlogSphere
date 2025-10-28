import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: Date,
  tags: [String],
  comments: [{ text: String, date: Date }],
  likes: { type: Number, default: 0 }
});

export default mongoose.model("Post", postSchema);
