// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withProtect from "../../../../../middleware/withProtect";
import Product from "../../../../../models/Product";
import dbConnect from "../../../../../utils/dbConnect";

dbConnect();

async function handler(req, res) {
  //!Update a Category
  if (req.method === "PUT") {
    try {
      const { imageSrc, uniqueId } = req.body;
      console.log(imageSrc, uniqueId);

      //   const id = req.query.id;
      const updatedProduct = await Product.findOneAndUpdate(
        { uniqueId: uniqueId },
        { $pull: { images: { imageSrc } } },
        { new: true }
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
}

export default withProtect(handler);
