const { Schema, model } = require("mongoose");

const orderSchema = Schema(
  {
    userId: String,
    customerId: String,
    paymentIntentId: String,
    products: [
      {
        id: String,
        name: String,
        desc: String,
        brand: String,
        price: Number,
        image: String,
        cartQuantity: Number,
      },
    ],

    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shippingCustomerDetails: { type: Object, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

exports.Order = Order;
