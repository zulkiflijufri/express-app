const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://kifli:12345@localhost:27017/latihan?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// create schema
const quotesSchema = new mongoose.Schema({
  word: String,
});

// create Model for schema
const Quote = mongoose.model("Quote", quotesSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  // create new quotes
  const quote = new Quote({
    word: "Introduction mongoose V2",
  });

  // save quote
  quote.save((err, quote) => {
    if (err) return console.error(err);
    console.log(quote);
  });

  //console.log("Database connect");
});
