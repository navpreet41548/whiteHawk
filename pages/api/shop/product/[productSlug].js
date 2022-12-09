// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../../models/Product";
import dbConnect from "../../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
  //!Get Product By Slug
  if (req.method === "GET") {
    try {
      const productSlug = req.query.productSlug;
      const product = await Product.findOne({ productSlug });
      if (product) {
        res.status(200).json({
          err: null,
          message: "Product Fetched successfully",
          data: product,
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
