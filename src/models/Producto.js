import Sequelize from "sequelize";
import { db } from "../config/db.js";

const Producto = db.define("productos", {
  nombre: {
    type: Sequelize.STRING,
  },
  descripcion: {
    type: Sequelize.STRING,
  },
  cantidad: {
    type: Sequelize.NUMBER,
  },
  foto: {
    type: Sequelize.STRING,
  },
});

export { Producto };
