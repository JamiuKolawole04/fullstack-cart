const { Router } = require("express");
const router = Router();

const cloudinary = require("../utils/cloudinary");
const { Product } = require("../models/product.model");
const { isAdmin } = require("../middleware/auth");

// CREATE
router.post("/", isAdmin, async (req, res) => {
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
      nbHits: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      err,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "product fetched successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      err,
    });
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.productImg) {
    try {
      const destroyResponse = await cloudinary.uploader.destroy(
        req.body.product.image.public_id
      );

      if (destroyResponse) {
        const uploadResponse = await cloudinary.uploader.upload(
          req.body.productImg,
          {
            upload_preset: "onlineShop",
          }
        );

        if (uploadResponse) {
          const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.product,
                image: uploadResponse,
              },
            },
            { new: true }
          );

          res.status(200).json({
            success: true,
            message: "product updated",
            updatedProduct,
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  } else {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.product,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "product updated",
        updatedProduct,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "product not found.",
        });
      }
    }
    res.status(200).json({
      success: true,
      message: "product deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      err,
    });
  }
});

module.exports = router;
