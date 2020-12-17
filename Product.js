const mongoose = require("mongoose");

// schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, "Nama produk harus diisi"],
  },
  price: {
    type: Number,
    required: true,
    minlength: 1000,
    maxlength: 1000000,
  },
  stock: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

// model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
