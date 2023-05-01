const app = require("./app");
const port = 5000;
const mongoose = require("mongoose");
require("dotenv").config()
//asignacion del puerto y requerir el archivo app para iniciar el servidor

//conexion a mongodb atlas
// const URI =
//   "mongodb+srv://reigendev:12345@cluster0.dwjq1vq.mongodb.net/API?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Conectado a mongo Atlas"))
  .catch((error) => console.log(error));

//arranque de la api
app.listen(process.env.PORT || port, () => {
  console.log("Server on port",process.env.PORT || port);
});
