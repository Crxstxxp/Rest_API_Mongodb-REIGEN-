const express = require("express");

const tempyhumeCtrl = require("../controllers/tempyhume");
const userCtrl = require("../controllers/user.controller");

const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      tempyhumes:
 *          type: object
 *          properties:
 *              temperature:
 *                  type: number
 *                  description: Temperatura obtenida por el sensor
 *              humidity:
 *                  type: number
 *                  description: Humedad obtenida por el sensor
 *          required:
 *              - temperature
 *              - humidity
 *          example:
 *              temperature: 15.5
 *              humidity: 16
 */

/**
 *  @swagger
 *  /api/data:
 *      get:
 *          summary: Obtiene todos los datos recolectados por los sensores
 *          tags: [Temperatura y humedad (tempyhumes)]
 *          responses:
 *              200:
 *                  description: Todos los datos registrados en esta coleccion
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/tempyhumes"
 *              404:
 *                  description: No encontrado o no existe
 */
router.get("/", tempyhumeCtrl.findAllData);

/**
 * @swagger
 *  /api/data/{id}:
 *      get:
 *          summary: Obtiene Un usuario en especifico
 *          tags: [Temperatura y humedad (tempyhumes)]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: object
 *                  $ref: "#/components/schemas/tempyhumes"
 *          responses:
 *              200:
 *                  description: Responde con los datos (temperatura y humedad) de un registro en especifico dependiendo de su id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: "#/components/schemas/Usuarios"
 *              404:
 *                  description: No encontrado o no existe
 */

router.get("/:id", tempyhumeCtrl.findOneData);

module.exports = router;
