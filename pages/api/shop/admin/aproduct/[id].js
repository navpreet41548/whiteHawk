// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withProtect from "../../../../../middleware/withProtect";
import Product from "../../../../../models/Product";
import dbConnect from "../../../../../utils/dbConnect";

dbConnect();

async function handler(req, res) {
  //!Update a Category
  if (req.method === "PUT") {
    try {
      const {
        name,
        sellingPrice,
        discountPrice,
        imageSrcs,
        productShortDesc,
        productDetail,
        categorySlug,
        status,
      } = req.body;
      const id = req.query.id;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          sellingPrice,
          discountPrice,
          imageSrcs,
          productShortDesc,
          productDetail,
          categorySlug,
          status,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        err: null,
        message: "Product Updated successfully",
        data: updatedProduct,
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
      const id = req.query.id;
      const deletedProduct = await Product.findOneAndDelete({ uniqueId: id });
      if (deletedProduct) {
        res.status(200).json({
          err: null,
          message: "Product Deleted successfully",
          data: deletedProduct,
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

export default withProtect(handler);
