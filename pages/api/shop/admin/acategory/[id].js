// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import withProtect from "../../../../../middleware/withProtect";
import Category from "../../../../../models/Category";
import Product from "/models/Product";
import dbConnect from "../../../../../utils/dbConnect";

dbConnect();

async function handler(req, res) {
  //!Update a Category
  if (req.method === "PUT") {
    try {
      const { name, imageSrc, slug } = req.body;
      const id = req.query.id;
      const updatedCategory = await Category.findByIdAndUpdate(id, {
        name,
        imageSrc,
        slug,
      });

      const updateProducts = await Product.updateMany(
        { category: updatedCategory.slug },
        { category: slug },
        { multi: true }
      );

      console.log("$$$", updatedCategory.slug, slug);

      res.status(200).json({
        err: null,
        message: "Category Updated successfully",
        data: updatedCategory,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: null,
        data: null,
      });
    }
  }
  //!Delete a Category
  if (req.method === "DELETE") {
    try {
      let id = req.query.id;
      const deletedCategory = await Category.findOneAndDelete({ _id: id });

      if (deletedCategory.name) {
        const deleteProducts = await Product.deleteMany({
          category: deletedCategory.slug,
        });
        console.log(deleteProducts);
        res.status(200).json({
          err: null,
          message: "Category Deleted successfully",
          data: deletedCategory,
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

export default withProtect(handler);
