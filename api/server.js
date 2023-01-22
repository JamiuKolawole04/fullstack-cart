require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { connect, set } = require("mongoose");

const products = require("./data");
const authRoute = require("./routes/auth.route");
const stripe = require("stripe")(process.env.STRIPE_KEY);

set("strictQuery", false);
connect(process.env.DB_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log({ message: "connected failed", err }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/api/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // res.redirect(303, session.url);
  res.status(201).json({
    success: true,
    url: session.url,
  });
});

app.use("/api/auth", authRoute);
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
