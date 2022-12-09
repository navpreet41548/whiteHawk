import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    message: {
      type: String,
    },
    user: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("Contact", contactSchema);
