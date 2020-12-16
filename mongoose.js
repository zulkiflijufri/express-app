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
  const deleteProduct = await Product.deleteOne({
    _id: "5fda0fbe343ae722984847d3",
  });

  console.log(deleteProduct);
});
