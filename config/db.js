const mongoose = require("mongoose");
const appConfig = require("./config");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(appConfig.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
