import fs from "fs";

const guardarImagen = (file) => {
  const newPath = `./src/uploads/${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath;
};

export default guardarImagen;
