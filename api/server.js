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
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post("/api/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    // line_items: [
    //   {
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: "T-shirt",
    //       },
    //       unit_amount: 2000,
    //     },
    //     quantity: 2,
    //   },
    //   {
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: "Phone",
    //       },
    //       unit_amount: 2000,
    //     },
    //     quantity: 1,
    //   },
    // ],
    line_items,
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["US", "CA", "NG"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          // delivers between 5-7 business days
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },

      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 1500, currency: "usd" },
          display_name: "Next day air",
          // delivers in exactly 1 business day
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 1 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
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
