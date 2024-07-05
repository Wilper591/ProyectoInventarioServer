import { Router } from "express";
import rutasRegistro from "./registro.routes.js"
const router = Router();

router.use("/registrar", rutasRegistro)

export default router;