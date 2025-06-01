import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let dbInstanceUsers;

const connectDB = async () => {
  if (dbInstanceUsers) {
    return { dbInstanceUsers };
  }

  try {
    // Solo conectar a la base de datos de usuarios (que ahora usas para todo)
    const clientUsers = new MongoClient(process.env.MONGO_URI_USERS);
    await clientUsers.connect();

    // Si tu URI ya incluye el nombre de la base de datos, esto es suficiente:
    dbInstanceUsers = clientUsers.db();

    console.log("MongoDB conectado a la base de datos de usuarios");
    return { dbInstanceUsers };
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
    process.exit(1);
  }
};

export { connectDB };