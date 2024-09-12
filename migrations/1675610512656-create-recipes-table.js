const Bluebird = require("bluebird");
const mongodb = require("mongodb");
const ck = require("ckey");
const MongoClient = mongodb.MongoClient;
const uri = ck.MONGODB_URI;

module.exports.up = (next) => {
  let mClient = null;
  return MongoClient.connect(uri)
    .then((client) => {
      mClient = client;
      return client.db("recipesApp");
    })
    .then((db) => {
      return db.createCollection("recipe", {
        id: mongodb.ObjectId,
        name: String,
        cookingTime: Number,
      });
    })
    .then(() => {
      mClient.close();
      return next();
    })
    .catch((err) => next(err));
};
module.exports.down = (next) => {
  //do it from the database
  next();
};
