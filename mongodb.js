const mongoClient = require("mongodb").MongoClient;

const connection = "mongodb://kifli:12345@localhost:27017?authSource=admin";

// mongoClient.connect(connection, { useUnifiedTopology: true }, (err, client) => {
//   if (err) return console.log(err);
//   console.log("Database connect");
// });

(async () => {
  try {
    const client = await mongoClient.connect(connection, {
      useUnifiedTopology: true,
    });
    if (client) {
      const db = await client.db("latihan");
      const quotes = await db.collection("quotes").find().toArray();
      console.log(quotes);
    }
  } catch (error) {
    console.log(error);
  }
})();
