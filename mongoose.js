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
  name: { type: String, required: [true, "Product name is required"] },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, default: true },
});

// create Model for schema
const Product = mongoose.model("Product", productSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", async () => {
  try {
    const create = await Product.create({});
    console.log(create);
  } catch (error) {
    const error_name = error.errors["name"] && error.errors["name"].message;
    console.error(error_name);
  }
});
