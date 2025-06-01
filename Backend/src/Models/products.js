import { connectDB } from "./index.js";

 
export const connectProductDB = async () => {
  const { dbInstanceUsers } = await connectDB();
  return dbInstanceUsers;
};