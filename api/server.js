require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const products = require("./data");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server on!",
  });
});

app.get("/products", (req, res) => {
  res.status(200).json({
    success: true,
    products,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
