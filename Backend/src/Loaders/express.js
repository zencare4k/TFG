import express from "express";
import cors from "cors";
import routes from "../Routes/index.js";

export default (expressApp) => {
  expressApp.use(cors({
    origin: [
      "https://tfg-git-main-zencare4ks-projects.vercel.app", // tu frontend en Vercel
      "http://localhost:3000" // para desarrollo local
    ],
    credentials: true
  }));
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));

  expressApp.use("/api/v1", routes);
  expressApp.use((req, res) => res.status(404).send({ message: "Not Found" }));
};