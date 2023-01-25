require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { connect, set } = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const products = require("./data");
const authRoute = require("./routes/auth.route");
const productsRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const { Order } = require("./models/order.model");

set("strictQuery", false);
connect(process.env.DB_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log({ message: "connected failed", err }));

app.use(express.json({ limit: "200mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//  create order
const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shippingCustomerDetails: data.customer_details,
    shipping: data.shipping,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("processed order", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// create checkout endpoint with stripe
app.post("/api/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });
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
    customer: customer.id,
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

/**
 * CREATEING STRIPE WEBHHOK
 */

// stripe webhook
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

const stripe2 = require("stripe");

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret =
//   "whsec_48aee6c5d987c8c10162f5854f0b1cecf04cc2276f5e48728ea0d0c4d3bb8dbb";

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe2.webhooks.constructEvent(req.body, sig, endpointSecret);

        console.log("webhooks verified");
      } catch (err) {
        console.log(`webhook error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    // switch (event.type) {
    //   case "payment_intent.succeeded":
    //     const paymentIntent = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          stripe.checkout.sessions.listLineItems(
            // "cs_test_a1sGpG3x8zvlairGWgsFyZ9x02bE0vDz381O7ej83zdjrfzKD88bimGd2p",
            data.id,
            {},
            function (err, lineItems) {
              // asynchronously called
              console.log("line items", lineItems);
              // createOrder(customer, data, lineItems);
            }
          );
          createOrder(customer, data);
          console.log("customer", customer);
          console.log("data", data);
        })
        .catch((err) => console.log(err.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

// app.listen(4242, () => console.log("Running on port 4242"));

app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/user", userRoute);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server on!",
  });
});

// app.get("/api/products", (req, res) => {
//   res.status(200).json({
//     success: true,
//     products,
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
