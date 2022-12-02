const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");
//-----------------------------
// CONFIGURACAO
//-----------------------------
// app.use(express.static(path.join(__dirname, "public")));
// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// origin
app.use(function (req, res, next) {
  // Website you wish to allow to connect

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//-----------------------------
// catch 404 and forward to error handler
//-----------------------------
//-----------------------------
// mongo db
//-----------------------------
mongoose.Promise = global.Promise;
mongoose
  .connect(db.mongoURI)
  .then(() => {
    console.log("Conectado com o mongo");
  })
  .catch((err) => {
    console.log("erro ao se conectar com o mongo", err);
  });
//-----------------------------
// ROTAS
//-----------------------------

const routesUsuario = require("./routes/usuario");
app.use("/usuario", routesUsuario);

const routesCategoria = require("./routes/categoria");
app.use("/categoria", routesCategoria);

const routesFilme = require("./routes/filme");
app.use("/filme", routesFilme);

const routesFilme_Comentarios = require("./routes/filme_comentarios");
app.use("/filme_comentarios", routesFilme_Comentarios);

//-----------------------------------------
// MODELS
//-----------------------------------------

require("./models/Usuario");
const Usuario = mongoose.model("usuario");
app.use((req, res, next) => {
  Usuario.find().then((usuario) => {
    if (usuario.length == 0) {
      console.log("Gravando usuario");
      const novo = new Usuario({
        nome: "admin",
        email: "admin@email.com",
        senha: "4353",
        tipo: 1,
      });
      novo.save();
    }
  });
  next();
});

require("./models/Categoria");
const Categoria = mongoose.model("categoria");
const listaCategoria = require("./lista/categoria");
app.use((req, res, next) => {
  Categoria.find().then((categorias) => {
    if (categorias.length == 0) {
      console.log("Gravando Categorias");
      listaCategoria.lista.forEach((element) => {
        const novo = new Categoria({
          nome: element.nome,
          icone: element.icone,
        });
        console.log("gravando categoria => ", novo);
        novo.save();
      });
    }
  });
  next();
});

require("./models/Filme");
const Filme = mongoose.model("filme");
const listaFilme = require("./lista/filme");
app.use((req, res, next) => {
  Filme.find().then((filmes) => {
    if (filmes.length == 0) {
      console.log("Gravando filmes");
      listaFilme.lista.forEach((element) => {
        const novo = new Filme({
          titulo: element.titulo,
          link_trailer: element.link_trailer,
          link_capa: element.link_capa
        });
        console.log("gravando filme => ", novo);
        novo.save();
      });
    }
  });
  next();
});

module.exports = app;
