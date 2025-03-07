import express from "express";
import loaders from "./Loaders/index.js";

const app = express();
loaders.init(app);

export default app;
