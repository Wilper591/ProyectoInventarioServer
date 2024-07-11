import { Producto } from "../models/Producto";
import { db } from "../config/db.js";

const nuevoProducto = async (req, res) => {
  try {
    const { nombre, descripcion, cantidad, foto } = req.body;
  } catch (error) {
    console.log({
      message: error.message,
      code: error.parent.code,
      detail: error.parent.detail,
      mensajeDelProgramador: "Creacion de nuevo usuario fallida.",
    });
    res.status(500).json({
      message: error.message,
      code: error.parent.code,
      detail: error.parent.detail,
      mensajeDelProgramador: "Creacion de nuevo usuario fallida.",
    });
  }
};

export { nuevoProducto };
