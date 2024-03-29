//Configuracion de express para inicializar el servidor
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//uso de las rutas creadas con express router
const userRoutes = require("./routes/users.routes");
const tempyhumeRoutes = require("./routes/tempyhume.routes");
//Documentacion
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerConfig = require("./swaggerConfig")

const app = express();
//Midelwares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerConfig))
);

app.get("/", (req, res) => {
  res.send("Si");
});

//el "/api/..." es para saber como esta formada la URL
app.use("/api/users", userRoutes);
app.use("/api/data", tempyhumeRoutes);

module.exports = app;
