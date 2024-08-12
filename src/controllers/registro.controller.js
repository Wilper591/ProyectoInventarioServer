import { Usuario } from "../models/Usuario.js";
import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    //Prevenir usuarios duplicados
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
      const error = new Error("Usuario ya registrado");
      return res.status(400).json({ msg: error.message });
    }
    /* Encripta la contraseña */
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Inicia la transacción */
    const transaction = await db.transaction();

    /* Crear el registro en la BD tabla usuarios */
    const newUser = await Usuario.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
    });

    if (!newUser.dataValues) {
      /* Reinicia la transacción */
      await transaction.rollback();
      /* Error */
      console.log({
        status: "Error",
        message: "No se pudo crear al nuevo usuario",
        code: 500,
      });
      res.status(500).json({
        status: "Error",
        message: "No se pudo crear al nuevo usuario",
        code: 500,
      });
    } else {
      /* Finaliza transcción */
      await transaction.commit();
      /* Success */
      console.log({
        status: "Success",
        message: "Usuario creado Éxitosamente",
        code: 200,
        account: newUser.dataValues,
      });
      res.status(200).json({
        status: "Success",
        message: "Usuario creado Éxitosamente",
        code: 200,
        account: newUser.dataValues,
      });
    }
  } catch (error) {
    console.log({
      message: error.message,
      mensajeDelProgramador: "Creacion de nuevo usuario fallida.",
    });
    res.status(500).json({
      message: error.message,
      mensajeDelProgramador: "Creacion de nuevo usuario fallida.",
    });
  }
};

export { registrarUsuario };
