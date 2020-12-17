const mongoose = require("mongoose");

const connection =
  "mongodb://kifli:12345@localhost:27017/latihan?authSource=admin";

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connect");
});
