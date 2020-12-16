const mongoose = require("mongoose");

mongoose.connect("mongodb://kifli:12345@localhost:27017?authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connect");
});
