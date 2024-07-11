import { Router } from "express";
import { nuevoProducto } from "./registro.routes.js";
import checkAuth from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/", checkAuth, nuevoProducto);

export default router;
