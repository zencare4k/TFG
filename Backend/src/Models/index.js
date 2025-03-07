import { MongoClient } from "mongodb";
import logger from "../Utils/logger.js";

let dbInstance;

const connectDB = async () => {
  if (dbInstance) return dbInstance;

  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    dbInstance = client.db();
    logger.info("MongoDB conectado");
    return dbInstance;
  } catch (error) {
    logger.error("Error conectando a MongoDB", error);
    process.exit(1);
  }
};

export { connectDB };
export default connectDB;