import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let dbInstance;

const connectProductDB = async () => {
  if (dbInstance) return dbInstance;

  try {
    const client = new MongoClient(process.env.MONGO_URI_USERS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    dbInstance = client.db("users"); // Conectar a la base de datos 'users'
    console.log("MongoDB conectado a la base de datos de usuarios");
    return dbInstance;
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
    process.exit(1);
  }
};

export { connectProductDB };