import { Router } from "express";
import {
  nuevoProducto,
  buscarProductos,
  buscarProductoCategoria,
  buscarProductoNombre,
  editarProducto,
  eliminarProducto,
} from "../controllers/producto.controller.js";
import checkAuth from "../middlewares/authMiddleware.js";
const router = Router();

import multer from "multer";
const upload = multer({ dest: "./src/uploads/" });

router
  .post("/", checkAuth, upload.single("imagenProducto"), nuevoProducto)
  .get("/", checkAuth, buscarProductos)
  .get("/byCategory/:categoria", checkAuth, buscarProductoCategoria)
  .get("/byName/:nombre",checkAuth, buscarProductoNombre)
  .put("/", checkAuth, editarProducto)
  .delete("/", checkAuth, eliminarProducto);

export default router;
