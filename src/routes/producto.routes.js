import { Router } from "express";
import { nuevoProducto } from "../controllers/producto.controller.js";
import checkAuth from "../middlewares/authMiddleware.js";
const router = Router();

import multer from "multer";
const upload = multer({ dest: "./src/uploads/" });

router.post("/", checkAuth, upload.single("imagenProducto"), nuevoProducto);

export default router;
