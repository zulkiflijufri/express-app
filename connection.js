const MongoClient = require("mongodb").MongoClient;

const connection = "mongodb://kifli:12345@localhost:27017?authSource=admin";

const client = new MongoClient(connection, { useUnifiedTopology: true });

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
})();

module.exports = client;
