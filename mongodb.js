const mongoClient = require("mongodb").MongoClient;

const connection = "mongodb://kifli:12345@localhost:27017?authSource=admin";

mongoClient.connect(connection, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  console.log("Database connect");
});
