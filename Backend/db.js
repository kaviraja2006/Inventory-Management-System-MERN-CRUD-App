const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/IMS";

const connectToMongo = async (uri = mongoURI) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

const disconnectMongo = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error("MongoDB disconnect error:", error.message);
  }
};

module.exports = { connectToMongo, disconnectMongo };
