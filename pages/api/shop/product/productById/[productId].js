// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../../../models/Product";
import dbConnect from "../../../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
  //!Get Product By Id
  if (req.method === "GET") {
    try {
      const productId = req.query.productId;
      const product = await Product.findById(productId);
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
