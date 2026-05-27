const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      title: String,

      price: Number,

      quantity: Number
    }
  ],

  shippingAddress: {
    type: String,
    required: true
  },

  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Processing"
  },

  platformFee: {
    type: Number
  },

  vendorPayout: {
    type: Number
  },


}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);