const { Router } = require("express");
const cloudinary = require("../utils/cloudinary");

const router = Router();

// CREATE
router.post("/", (req, res) => {
  const { name, brand, desc, price, image } = req.body;
});

module.exports = router;
