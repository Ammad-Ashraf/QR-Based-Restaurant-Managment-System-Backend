const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      address: { type: String, required: true },
      contact: { type: String, required: true },
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    orderType: { type: String, enum: ["dine-in", "takeaway"], required: true },
    specialInstructions: { type: String },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "delivered"],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
