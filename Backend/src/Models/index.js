import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let dbInstanceUsers;
let dbInstanceProducts;

const connectDB = async () => {
  if (dbInstanceUsers && dbInstanceProducts) return { dbInstanceUsers, dbInstanceProducts };

  try {
    const clientUsers = new MongoClient(process.env.MONGO_URI_USERS);
    const clientProducts = new MongoClient(process.env.MONGO_URI_PRODUCTS);

    await clientUsers.connect();
    await clientProducts.connect();

    dbInstanceUsers = clientUsers.db();
    dbInstanceProducts = clientProducts.db();

    console.log("MongoDB conectado a las bases de datos de usuarios y productos");
    return { dbInstanceUsers, dbInstanceProducts };
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
    process.exit(1);
  }
};

export { connectDB };