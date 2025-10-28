import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: Date,
  tags: [String],
  comments: [{ text: String, date: Date }],
  likes: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Post", PostSchema);
