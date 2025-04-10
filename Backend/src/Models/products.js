import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let dbInstance;

const connectProductDB = async () => {
  if (dbInstance) return dbInstance;

  try {
    const client = new MongoClient(process.env.MONGO_URI_PRODUCTS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    dbInstance = client.db("products"); // Conectar a la base de datos 'products'
    console.log("MongoDB conectado a la base de datos de productos");
    return dbInstance;
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
    process.exit(1);
  }
};

export { connectProductDB };