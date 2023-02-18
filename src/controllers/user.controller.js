const Users = require("../models/Users");
const bcrypt = require('bcrypt')
const salytRounds = 10
var jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const someUser = await Users.findOne({email: req.body.email})
  if (someUser){
    const cmp = await bcrypt.compare(req.body.password, someUser.password)
    if (cmp){
      var token = jwt.sign({email: someUser.email, _id: someUser._id}, 'Secret',{
        expiresIn: '2h'
      })
      res.send({
        user: someUser.email,
        id: someUser._id,
        token: token,
        auth: true
      })
    } else {
      res.send("Usuario o contraseña incorrectos")
    }
  } else {
    res.send("Usuario o contraseña incorrectos")
  }
}

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send({
      status: 403,
      mensaje: "No se encontro el token",
    });
  } else {
    jwt.verify(token, "Secret", (err, decoded) => {
      if (err) {
        res.send({
          status: 402,
          resultado: { mensaje: "Fallo la autentificación" },
          error: err,
        });
      } else {
        req.userEmail = decoded.email
        req.userId = decoded._id
        next();
      }
    });
  }
};

//FUNCIONES CRUD

const findAllUsers = async (req, res) => {
  const users = await Users.find();
  res.json(users);
};

const saveUser = async (req, res) => {
  const hashedPwd = await bcrypt.hash(req.body.password, salytRounds)
  //la linea de arriba solo es para encriptar la contraseña
  const newUser = new Users({
    email: req.body.email,
    password: hashedPwd,
  });
  const userSaved = await newUser.save();
  res.json(userSaved);
};

const findOneUser = async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.json(user);
};

const deleteUser = async (req, res) => {
  await Users.findByIdAndDelete(req.params.id);
  res.json({
    mensaje: "El usuario se ha eliminado",
  });
};

const updateUser = async (req, res) => {
  const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    mensaje: "El usuario se actualizo :D",
  });
};

module.exports = {
  findAllUsers,
  saveUser,
  findOneUser,
  deleteUser,
  updateUser,
  login,
  verifyJWT
};
