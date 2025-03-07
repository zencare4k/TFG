import dotenv from "dotenv";
dotenv.config();

const config = {
  app: { port: process.env.PORT || 5000 },
  mongoURIUsers: process.env.MONGO_URI_USERS,
  mongoURIProducts: process.env.MONGO_URI_PRODUCTS,
  jwtSecret: process.env.JWT_SECRET,
};

export default config;