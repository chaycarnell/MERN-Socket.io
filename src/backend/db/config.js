const MongoClient = require('mongodb').MongoClient;
let _db;
module.exports = {
  connectMongo: callback => {
    MongoClient.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        _db = client.db();
        return callback(err);
      }
    );
  },
  db: () => {
    return _db;
  },
  collections: {
    COLLECTION_NAME: 'COLLECTION_NAME'
  }
};
