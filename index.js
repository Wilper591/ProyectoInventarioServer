import { app, PORT } from "./src/app.js";

app.listen(PORT ,() => {
    console.log(
      `Servidor Levantando en el Puerto ${PORT} - PID ${process.pid}`
    );
})