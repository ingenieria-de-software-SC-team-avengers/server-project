//en este archivo hacemos todas las conf que necesite el server, instanciar el server, cors, etc
import app from "./app";
import './database';

app.listen(app.get("port"), () => {
    console.log(`servidor corriendo en el puerto ${app.get("port")}`);
});