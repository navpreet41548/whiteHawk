// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withProtect from "../../../../../middleware/withProtect";
import Product from "../../../../../models/Product";
import dbConnect from "../../../../../utils/dbConnect";
import slug from "slug";

dbConnect();

async function handler(req, res) {
  //!Create a Product
  if (req.method === "POST") {
    try {
      const {
        title,
        actualPrice,
        discountPrice,
        image,
        shortDesc,
        desc,
        status,
        uniqueId,
        maintainOriginalRatio,
        uploadData,
        category,
        productSlug,
        tag,
      } = req.body;

      if (uniqueId) {
        const exitingProduct = await Product.find({ uniqueId: uniqueId });
        if (exitingProduct.length !== 0) {
          try {
            if (typeof uploadData !== "undefined") {
              const updatedProduct = await Product.findOneAndUpdate(
                { uniqueId: uniqueId },
                {
                  uniqueId: uniqueId,
                  title: title,
                  actualPrice: actualPrice,
                  discountPrice: discountPrice,
                  shortDesc: shortDesc,
                  desc: desc,
                  productSlug,
                  category,
                  tag,
                  $push: {
                    images: {
                      imageSrc: image,
                      maintainOriginalRatio,
                      uploadData: {
                        public_id: uploadData?.public_id,
                        signature: uploadData?.signature,
                      },
                    },
                  },
                },
                { new: true }
              );
              res.status(200).json({
                err: null,
                message: "Product Updated successfully",
                data: updatedProduct,
              });
            } else {
              const updatedProduct = await Product.findOneAndUpdate(
                { uniqueId: uniqueId },
                {
                  uniqueId: uniqueId,
                  title: title,
                  actualPrice: actualPrice,
                  discountPrice: discountPrice,
                  shortDesc: shortDesc,
                  desc: desc,
                  productSlug,
                  category,
                  tag,
                },
                { new: true }
              );
              res.status(200).json({
                err: null,
                message: "Product Updated successfully",
                data: updatedProduct,
              });
            }
          } catch (err) {
            console.log("$$$$$", err);
            res.status(400).json({
              err: err.message,
              message: "Internal Server Error1",
              data: null,
            });
          }
        } else {
          try {
            if (typeof uploadData !== "undefined") {
              const product = new Product({
                title,
                actualPrice,
                discountPrice,
                shortDesc,
                desc,
                productSlug,
                category,
                status,
                uniqueId,
                maintainOriginalRatio,
                tag,
                images: [
                  {
                    imageSrc: image,
                    maintainOriginalRatio,
                    uploadData: {
                      public_id: uploadData?.public_id,
                      signature: uploadData?.signature,
                    },
                  },
                ],
              });
              const savedProduct = await product.save();
              // const reSavedProduct = await Product.updateOne(
              //   { uniqueId: savedProduct.uniqueId },
              //   { $set: { "images.$.imageSrc": image } }
              // );
              res.status(200).json({
                err: null,
                message: "Product Created successfully",
                data: savedProduct,
              });
            } else {
              const product = new Product({
                title,
                actualPrice,
                discountPrice,
                shortDesc,
                desc,
                productSlug,
                category,
                status,
                uniqueId,
                maintainOriginalRatio,
                tag,
              });
              const savedProduct = await product.save();
              // const reSavedProduct = await Product.updateOne(
              //   { uniqueId: savedProduct.uniqueId },
              //   { $set: { "images.$.imageSrc": image } }
              // );
              res.status(200).json({
                err: null,
                message: "Product Created successfully",
                data: savedProduct,
              });
            }
          } catch (err) {
            console.log("$$$$$$$$", err);
            res.status(400).json({
              err: err.message,
              message: "Internal Server Error2",
              data: null,
            });
          }
        }
      }
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "Internal Server Error",
        data: null,
      });
    }
  }
}

export default withProtect(handler);
