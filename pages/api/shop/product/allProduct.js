// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../../models/Product";
import dbConnect from "../../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
  //!Get Categories
  if (req.method === "GET") {
    try {
      const products = await Product.find({});
      res.status(200).json({
        err: null,
        message: "Products Fetched successfully",
        data: products,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: null,
        data: null,
      });
    }
  }
}
