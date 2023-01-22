require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { connect, set } = require("mongoose");

const products = require("./data");

set("strictQuery", false);
connect(process.env.DB_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log({ message: "connected failed", err }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server on!",
  });
});

app.get("/api/products", (req, res) => {
  res.status(200).json({
    success: true,
    products,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
