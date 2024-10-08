import express from "express";
import rutas from "./routes/index.routes.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./src/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

//Rutas
app.use("/apiV1", rutas);

export { app, PORT };
