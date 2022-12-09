import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  imageSrc: {
    type: String,
    required: [true, "Image Source is required"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
  },
});

mongoose.models = {};

export default mongoose.model("Category", categorySchema);
