const { Router } = require("express");
const router = Router();

const cloudinary = require("../utils/cloudinary");
const { Product } = require("../models/product.model");

// CREATE
router.post("/", async (req, res) => {
  const { name, brand, desc, price, image } = req.body;

  try {
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineShop",
      });

      if (uploadResponse) {
        const product = new Product({
          name,
          brand,
          desc,
          image: uploadResponse.url,
          price,
        });

        const savedProduct = await product.save();

        res.status(201).json({
          success: true,
          savedProduct,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      err,
    });
  }
});

module.exports = router;
