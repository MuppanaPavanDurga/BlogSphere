import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phno: { type: String, required: true }
});

export default mongoose.model("Contact", contactSchema);
