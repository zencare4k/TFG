import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let dbInstanceUsers;
let dbInstanceProducts;

const connectDB = async () => {
  if (dbInstanceUsers && dbInstanceProducts) {
    return { dbInstanceUsers, dbInstanceProducts };
  }

  try {
    // Conectar a las bases de datos de usuarios y productos
    const clientUsers = new MongoClient(process.env.MONGO_URI_USERS);
    const clientProducts = new MongoClient(process.env.MONGO_URI_PRODUCTS);

    await clientUsers.connect();
    await clientProducts.connect();

    // Especificar los nombres de las bases de datos
    dbInstanceUsers = clientUsers.db(process.env.DB_NAME_USERS); // Nombre de la base de datos de usuarios
    dbInstanceProducts = clientProducts.db(process.env.DB_NAME_PRODUCTS); // Nombre de la base de datos de productos

    console.log("MongoDB conectado a las bases de datos de usuarios y productos");
    return { dbInstanceUsers, dbInstanceProducts };
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};

export { connectDB };