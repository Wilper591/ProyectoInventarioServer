import { Router } from "express";
import rutasRegistro from "./registro.routes.js"
import rutasLogin from "./login.routes.js";
const router = Router();

router.use("/registrar", rutasRegistro)
router.use("/iniciar_sesion", rutasLogin)


export default router;