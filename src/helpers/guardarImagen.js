import fs from "fs";

const guardarImagen = (file) => {
  const newPath = `../uploads/${file.originalname}`;
  fs.renameSync(file.path, newPath)
};

export default guardarImagen;
