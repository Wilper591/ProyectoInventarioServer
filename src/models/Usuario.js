import Sequelize from "sequelize";
import { db } from "../config/db.js";

const Usuario = db.define("usuarios", {
  nombre: {
    type: Sequelize.STRING,
  },
  apellido: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

export { Usuario };
