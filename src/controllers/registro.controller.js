import { Usuario } from "../models/Usuario.js";

const registrarUsuario = async (req,res) => {
  res.status(200).json({msg: "Registro exitoso"})
};

export { registrarUsuario };
