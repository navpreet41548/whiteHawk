import withProtect from "../../../../../middleware/withProtect";
import Product from "../../../../../models/Product";

async function handler(req, res) {
  try {
    const product = await Product.findOne({
      images: { $elemMatch: { imageSrc: req.body.imageSrc } },
    });
    for (let i = 0; i < product.images.length; i++) {
      const element = product.images[i];
      if (element.imageSrc == req.body.imageSrc) {
        return res.json({
          err: null,
          message: "Image Object Found Successfully",
          data: element,
        });
      }
    }
  } catch (err) {
    console.log("$$$", err);
    res.json(err);
  }
}

export default withProtect(handler);
