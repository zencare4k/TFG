import dotenv from "dotenv";
dotenv.config();

const config = {
  app: { port: process.env.PORT || 5000 },
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
