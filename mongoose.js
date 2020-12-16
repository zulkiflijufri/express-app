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
  // await Quote.find().exec((err, result) => {
  //   console.log(result);
  // });
  const product = await Product.findOne({
    _id: "5fd9c4c23652366bd1599028",
  });
  console.log(product);
});
