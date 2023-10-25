import mongoose from 'mongoose';
import appConfig from '../../config/config';

export const mongoConnect = async () => {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(appConfig.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};
