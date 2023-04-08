const express = require("express");
//Obtener los controladores
const userCtrl = require("../controllers/user.controller");

//ejecucion de router para crear las rutas
const router = express.Router();

//endpoints para los usuarios, EL ORDEN DE LAS RUTAS ES IMPORTANTE, DEJA AL ULTIMO LAS QUE RECIBEN ID
/**
 * @swagger
 * components:
 *  schemas:
 *      Usuarios:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: El correo electronico con el que el usuario entrara a la app
 *              name:
 *                  type: string
 *                  description: Nombre del usuario
 *              lastname:
 *                  type: string
 *                  description: Apellido del usuario
 *              password:
 *                  type: string
 *                  description: Contraseña del usuario
 *          required:
 *              - email
 *              - name
 *              - lastname
 *              - password
 *          example:
 *              email: UserExample.com
 *              name: user
 *              lastname: sysadmin
 *              password: sysadminpassword
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: El correo electronico con el que el usuario entrara a la app
 *              password:
 *                  type: string
 *                  description: Contraseña del usuario
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: UserExample.com
 *              password: sysadminpassword
 *
 */

/**
 * @swagger
 *  /api/users:
 *      post:
 *          summary: Al hacer una peticion post a esta ruta se guardara un usuario nuevo
 *          tags: [Usuarios]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Usuarios'
 *          responses:
 *              200:
 *                  description: El nuevo usuario ha sido registrado
 */

router.post("/", userCtrl.saveUser);

/**
 * @swagger
 *  /api/login:
 *      post:
 *          summary: Esta ruta requiere del usuario y la contraseña deñ usuario para loggearse dentro de la aplicacion
 *          tags: [Usuarios]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: El usuario se loggeo correctamente dentro de la aplicacion y genero un token de acceso
 *              403:
 *                  description: Usuario y/o contraseña incorrectos
 */

router.post("/login", userCtrl.login);

/**
 * @swagger
 *  /api/users:
 *      get:
 *          summary: Obtiene todos los usuarios
 *          tags: [Usuarios]
 *          responses:
 *              200:
 *                  description: Todos los usuarios
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Usuarios"
 *              404:
 *                  description: No encontrado o no existe
 */
router.get("/", userCtrl.findAllUsers);

/**
 *  @swagger
 *  /api/users/{id}:
 *      get:
 *          summary: Obtiene Un usuario en especifico
 *          tags: [Usuarios]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: object
 *                  $ref: "#/components/schemas/Usuarios"
 *          responses:
 *              200:
 *                  description: Responde con los datos del usuario dependiendo de su id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: "#/components/schemas/Usuarios"
 *              404:
 *                  description: No encontrado o no existe
 */

router.get("/:id", userCtrl.verifyJWT, userCtrl.findOneUser);

/**
 *  @swagger
 *  /api/users/{id}:
 *      delete:
 *          summary: Eliminar un usuario
 *          tags: [Usuarios]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: object
 *                  $ref: "#/components/schemas/Usuarios"
 *          responses:
 *              200:
 *                  description: Usuario eliminado
 *              404:
 *                  description: No encontrado o no existe
 */

router.delete("/:id", userCtrl.verifyJWT, userCtrl.deleteUser);

/**
 * @swagger
 *  /api/users/{id}:
 *      put:
 *          summary: Actualizar un usuario
 *          tags: [Usuarios]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Usuarios'
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: object
 *                  $ref: "#/components/schemas/Usuarios"
 *          responses:
 *              200:
 *                  description: Usuario actualizado
 *              404:
 *                  description: No encontrado o no existe
 */

router.put("/:id", userCtrl.verifyJWT, userCtrl.updateUser);

module.exports = router;
