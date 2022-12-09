// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../../../models/Product";
import dbConnect from "../../../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
  //!Get Products By Category Slug
  if (req.method === "GET") {
    let products = [];
    try {
      const categorySlug = req.query.categorySlug;
      if (categorySlug == "allProducts") {
        products = await Product.find({});
      } else {
        products = await Product.find({ category: categorySlug });
      }
      if (products) {
        res.status(200).json({
          err: null,
          message: "Products Fetched successfully",
          data: products,
        });
      } else {
        res.status(400).json({
          err: null,
          message: "Product Not Found",
          data: null,
        });
      }
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: null,
        data: null,
      });
    }
  }
}
