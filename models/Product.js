import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Product name is required"],
  },
  actualPrice: {
    type: Number,
    // required: [true, "Selling Price is required"],
  },
  discountPrice: {
    type: Number,
    // required: [true, "Discounted Price is required"],
  },
  images: [
    {
      imageSrc: String,
      maintainOriginalRatio: Boolean,
      // uploadData: { public_id: String, signature: String },
      uploadData: { public_id: String, signature: String },
    },
  ],
  maintainOriginalRatio: {
    type: Boolean,
  },
  shortDesc: {
    type: String,
    // required: [true, "Short Desc is required"],
  },
  desc: {
    type: String,
    // required: [true, "Detail is required"],
  },
  category: {
    type: String,
    // required: [true, "Category Slug is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  uniqueId: {
    type: String,
  },
  productSlug: {},
  tag: String,
});

mongoose.models = {};

export default mongoose.model("Product", productSchema);
