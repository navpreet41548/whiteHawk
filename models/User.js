import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  hashedPassword: {
    type: String,
    required: [true, "Password is required"],
  },
  admin: {
    type: Boolean,
  },
  username: {
    type: String,
  },
});

mongoose.models = {};

export default mongoose.model("User", userSchema);
