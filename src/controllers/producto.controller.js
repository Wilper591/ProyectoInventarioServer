import { Producto } from "../models/Producto.js";
import { db } from "../config/db.js";
import guardarImagen from "../helpers/guardarImagen.js";

const nuevoProducto = async (req, res) => {
  try {
    const { imagen } = req.file;
    const { nombre, descripcion, cantidad } = req.body;

    const foto = guardarImagen(imagen);
    /* Inicia la transacción */
    const transaction = await db.transaction();

    const newProduct = await Producto.create({
      nombre,
      descripcion,
      cantidad,
      foto,
    });

    if (!newProduct.dataValues) {
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
        account: newProduct.dataValues,
      });
      res.status(200).json({
        status: "Success",
        message: "Usuario creado Éxitosamente",
        code: 200,
        account: newProduct.dataValues,
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

export { nuevoProducto };
