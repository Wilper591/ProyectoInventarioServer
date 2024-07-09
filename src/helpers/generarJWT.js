import jwt from "jsonwebtoken";

const generarJWT = (id, tipo) => {
  return jwt.sign({ id, tipo }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

export default generarJWT;
