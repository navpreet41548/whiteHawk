// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withProtect from "../../../../../middleware/withProtect";
import Category from "../../../../../models/Category";
import dbConnect from "../../../../../utils/dbConnect";

dbConnect();

async function handler(req, res) {
  //!Create a Category
  if (req.method === "POST") {
    try {
      const { name, imageSrc, slug } = req.body;

      const data = await Category.findOne({ name });
      if (!data) {
        const category = new Category({ name, imageSrc, slug });
        const savedCategory = await category.save();
        res.status(200).json({
          err: null,
          message: "Category Created successfully",
          data: savedCategory,
        });
      } else {
        res.status(400).json({
          err: "Category Already Exists",
          message: "Category Already Exists",
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
  //!Get Categories
  // if (req.method === "GET") {
  //   try {
  //     const categories = Category.find({});
  //     res.status(200).json({
  //       err: null,
  //       message: "Category Fetched successfully",
  //       data: categories,
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       err: err.message,
  //       message: null,
  //       data: null,
  //     });
  //   }
  // }
  //!Update a Category
  // if (req.method === "POST") {
  //   try {
  //     const { name, imageSrc, slug } = req.body;
  //     const category = new Category({ name, image, slug });
  //     const savedCategory = await category.save();
  //     res.status(200).json({
  //       err: null,
  //       message: "Category Created successfully",
  //       data: savedCategory,
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       err: err.message,
  //       message: null,
  //       data: null,
  //     });
  //   }
  // }
}

export default withProtect(handler);
