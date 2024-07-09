import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/generarJWT.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    /* Busca el usuario en la BD por el Email ingresado */
    const loggedUser = await Usuario.findOne({ where: { email } });
    /* Valida si el Email Existe */
    if (!loggedUser) {
      const error = new Error("El Usuario no Existe");
      return res.status(401).json({ msg: error.message });
    }
    // Compara la contraseña ingresada por el usuario y la almacenada en la BD
    const validPassword = await bcrypt.compare(password, loggedUser.password);
    /* Valida si la contraseña es correcta */
    if (!validPassword) {
      const error = new Error("El Password es Incorrecto");
      return res.status(401).json({ msg: error.message });
    } else {
      const token = generarJWT(loggedUser.id, loggedUser.tipo_usuario);

      console.log({
        status: "Success",
        is_Active: true,
        message: "Usuario logueado",
        loginData: loggedUser.dataValues,
      });
      res.status(200).json({
        status: "Success",
        is_Active: true,
        message: "Usuario logueado",
        token,
        loginData: loggedUser.dataValues,
      });
    }
  } catch (error) {
    console.log({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Login fallido",
    });
    res.status(500).json({
      status: "Error",
      message: error.message,
      mensajeDelProgramador: "Login fallido",
    });
  }
};

export { loginUser };
