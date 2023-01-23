const { Schema, model } = require("mongoose");

const productSchema = Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

exports.Product = Product;
