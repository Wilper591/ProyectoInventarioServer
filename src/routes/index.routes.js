import { Router } from "express";
import rutasRegistro from "./registro.routes.js";
import rutasLogin from "./login.routes.js";
import rutasProducto from "./producto.routes.js";
const router = Router();

router.use("/registrar", rutasRegistro);
router.use("/iniciar_sesion", rutasLogin);
router.use("/productos", rutasProducto);

export default router;
