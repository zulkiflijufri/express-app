const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://kifli:12345@localhost:27017/latihan?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// create schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  status: { type: Boolean, default: true },
});

// create Model for schema
const Product = mongoose.model("Product", productSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", async () => {
  const newProduct = await Product.create({
    name: "Modem versi 2",
    price: 70000,
    stock: 1,
    status: null,
  });
  console.log(newProduct);
});
