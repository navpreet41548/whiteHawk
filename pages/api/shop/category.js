// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Category from "../../../models/Category";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
  //!Get Categories
  if (req.method === "GET") {
    try {
      const categories = await Category.find({});
      res.status(200).json({
        err: null,
        message: "Category Fetched successfully",
        data: categories,
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
