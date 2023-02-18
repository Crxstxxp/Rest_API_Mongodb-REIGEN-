const express = require("express");
//Obtener los controladores
const userCtrl = require("../controllers/user.controller");

//ejecucion de router para crear las rutas
const router = express.Router();

//endpoints para los usuarios, EL ORDEN DE LAS RUTAS ES IMPORTANTE, DEJA AL ULTIMO LAS QUE RECIBEN ID
router.post("/", userCtrl.saveUser);

router.post("/login", userCtrl.login)

router.get("/", userCtrl.findAllUsers);

router.get("/:id", userCtrl.findOneUser);

router.delete("/:id", userCtrl.deleteUser);

router.put("/:id", userCtrl.updateUser);

module.exports = router;
