import { Producto } from "../models/Producto.js";
import { db } from "../config/db.js";
import guardarImagen from "../helpers/guardarImagen.js";
import { Op } from "sequelize";

const nuevoProducto = async (req, res) => {
  try {
    const { nombre, descripcion, cantidad, categoria } = req.body;

    /* Inicia la transacción */
    const transaction = await db.transaction();

    /* Guarda la imagen */
    const imagen = guardarImagen(req.file);

    /* Separa la ruta de guardado del nombre de la imagen */
    let newName = imagen.split("./src/uploads/");

    /* Añade la ruta del servidor al nombre de la imagen */
    let foto = `http://localhost:3000/${newName[1]}`;

    /* Crea el nuevo registro del objeto con los nuevos datos */
    const newProduct = await Producto.create({
      nombre,
      descripcion,
      cantidad,
      foto,
      categoria,
    });

    if (!newProduct.dataValues) {
      /* Reinicia la transacción */
      await transaction.rollback();
      /* Error */
      console.log({
        status: "Error",
        message: "No se pudo crear el nuevo producto",
        code: 500,
      });
      res.status(500).json({
        status: "Error",
        message: "No se pudo crear el nuevo producto",
        code: 500,
      });
    } else {
      /* Finaliza transcción */
      await transaction.commit();
      /* Success */
      console.log({
        status: "Success",
        message: "Producto creado Éxitosamente",
        code: 200,
        product: newProduct.dataValues,
      });
      res.status(200).json({
        status: "Success",
        message: "Producto creado Éxitosamente",
        code: 200,
        product: newProduct.dataValues,
      });
    }
  } catch (error) {
    console.log({
      message: error.message,
      mensajeDelProgramador: "Creación de nuevo producto fallida.",
    });
    res.status(500).json({
      message: error.message,
      mensajeDelProgramador: "Creación de nuevo producto fallida.",
    });
  }
};

const buscarProductos = async (req, res) => {
  try {
    const leerProductos = await Producto.findAll();

    if (!leerProductos) {
      /* Error */
      console.log({
        status: "Error",
        message: "No se pudo obtener el listado de productos",
        code: 500,
      });
      res.status(500).json({
        status: "Error",
        message: "No se pudo obtener el listado de productos",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Listado de productos obtenidos Exitosamente",
        code: 200,
        products: leerProductos,
      });
      res.status(200).json({
        status: "Success",
        message: "Listado de productos obtenidos Exitosamente",
        code: 200,
        products: leerProductos,
      });
    }
  } catch (error) {
    console.log({
      message: error.message,
      mensajeDelProgramador: "Listado de productos no encontrado!.",
    });
    res.status(500).json({
      message: error.message,
      mensajeDelProgramador: "Listado de productos no encontrado!.",
    });
  }
};

const buscarProductoCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;

    const productoByCategoria = await Producto.findAll({
      where: { categoria : {
        [Op.like]: `%${categoria}%`
      } },
    });

    if (!productoByCategoria) {
      /* Error */
      console.log({
        status: "Error",
        message: "No se pudo obtener la categoria",
        code: 500,
      });
      res.status(500).json({
        status: "Error",
        message: "No se pudo obtener la categoria",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Categoria de productos encontrada Exitosamente",
        code: 200,
        product: productoByCategoria,
      });
      res.status(200).json({
        status: "Success",
        message: "Categoria de productos encontrada Exitosamente",
        code: 200,
        product: productoByCategoria,
      });
    }
  } catch (error) {
    console.log({
      message: error.message,
      mensajeDelProgramador: "Categoria de productos no encontrado!.",
    });
    res.status(500).json({
      message: error.message,
      mensajeDelProgramador: "Categoria de productos no encontrado!.",
    });
  }
};

const buscarProductoNombre = async (req, res) => {
  try {
    const { nombre } = req.params;

    const productByName = await Producto.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`,
        },
      },
    });

    if (!productByName) {
      /* Error */
      console.log({
        status: "Error",
        message: "No se encontrar productos con ese nombre",
        code: 500,
      });
      res.status(500).json({
        status: "Error",
        message: "No se encontrar productos con ese nombre",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Producto encontrado con exito!",
        code: 200,
        product: productByName,
      });
      res.status(200).json({
        status: "Success",
        message: "Producto encontrado con exito!",
        code: 200,
        product: productByName,
      });
    }
  } catch (error) {
    console.log({
      message: error.message,
      mensajeDelProgramador: "Nombre de productos no encontrado!.",
    });
    res.status(500).json({
      message: error.message,
      mensajeDelProgramador: "Nombre de productos no encontrado!.",
    });
  }
};

const editarProducto = async (req, res) => {
  try {
    const { id, nombre, descripcion, cantidad, categoria } = req.body;

    /* Inicia la transacción */
    const transaction = await db.transaction();

    const editProduct = await Producto.update(
      {
        nombre,
        descripcion,
        cantidad,
        categoria,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!editProduct) {
      /* Reinicia la transacción */
      await transaction.rollback();
      /* Error */
      console.log({
        status: "Error",
        message: "No se pudo editar el producto",
        code: 500,
      });
      res.status(500).json({
        status: "Error",
        message: "No se pudo editar el producto",
        code: 500,
      });
    } else {
      /* Finaliza transcción */
      await transaction.commit();
      /* Success */
      console.log({
        status: "Success",
        message: "Producto editado Éxitosamente",
        code: 200,
      });
      res.status(200).json({
        status: "Success",
        message: "Producto editado Éxitosamente",
        code: 200,
      });
    }
  } catch (error) {
    console.log({
      message: error.message,
      mensajeDelProgramador: "No se pudo editar el producto correctamente!.",
    });
    res.status(500).json({
      message: error.message,
      mensajeDelProgramador: "No se pudo editar el producto correctamente!.",
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.body;

    /* Inicia la transacción */
    const transaction = await db.transaction();

    const deleteProduct = await Producto.destroy({
      where: {
        id,
      },
    });
    if (!deleteProduct) {
      /* Reinicia la transacción */
      await transaction.rollback();
      /* Error */
      console.log({
        status: "Error",
        message: "No se pudo eliminar el producto",
        code: 500,
      });
      res.status(500).json({
        status: "Error",
        message: "No se pudo eliminar el producto",
        code: 500,
      });
    } else {
      /* Finaliza transcción */
      await transaction.commit();
      /* Success */
      console.log({
        status: "Success",
        message: "Producto Eliminado Éxitosamente",
        code: 200,
      });
      res.status(200).json({
        status: "Success",
        message: "Producto Eliminado Éxitosamente",
        code: 200,
      });
    }
  } catch (error) {
    console.log({
      message: error.message,
      mensajeDelProgramador: "No se pudo eliminar el producto correctamente!.",
    });
    res.status(500).json({
      message: error.message,
      mensajeDelProgramador: "No se pudo eliminar el producto correctamente!.",
    });
  }
};

export {
  nuevoProducto,
  buscarProductos,
  buscarProductoCategoria,
  buscarProductoNombre,
  editarProducto,
  eliminarProducto,
};
