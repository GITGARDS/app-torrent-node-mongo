const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

require("../models/Filme");
const Entidade = mongoose.model("filme_comentarios");

router.post("/novo", (req, res) => {
  const novo = {
    filme_id: req.body.filme_id,
    comentario: req.body.comentario,
    nome: req.body.nome,
    email: req.body.email,
  };
  new Entidade(novo)
    .save()
    .then(() => {
      const msg = "Registro gravado com sucesso.";
      console.log(msg);
      res.send({ msg });
    })
    .catch((err) => {
      const msg = "Erro ao tentar incluir registro!" + err;
      console.log(msg);
      res.send({ msg });
    });
});

router.put("/editar", (req, res) => {
  Entidade.findOne({ _id: req.body._id }).then((reg) => {
      reg.comentario  = req.body.comentario,
      reg.nome        = req.body.nome,
      reg.email       = req.body.email,
      reg
        .save()
        .then(() => {
          const msg = "Registro alterado com sucesso!";
          console.log(msg);
          res.send({ msg });
        })
        .catch((err) => {
          const msg = "Erro ao tentar alterar registro!";
          console.log(msg);
          res.send({ msg });
        });
  });
});

router.delete("/excluir/:id", (req, res) => {
  Entidade.findOne({ _id: req.params.id }).then((reg) => {
    reg
      .delete()
      .then(() => {
        const msg = "Registro excluido com sucesso!";
        console.log(msg);
        res.send({ msg });
      })
      .catch((err) => {
        const msg = "Erro ao tentar excluir registro!";
        console.log(msg);
        res.send({ msg });
      });
  });
});

router.post("/findall", (req, res) => {
  Entidade.find({ filme_id: req.body.filme_id })
    .then((reg) => {
      if (reg.length == 0) {
        return res.send({ msg: "Nenhum registro encontrado!" });
      }
      res.send(reg);
    })
    .catch((err) => {
      res.send({ err });
    });
});

router.get("/findbyid/:id", (req, res) => {
  Entidade.findOne({ _id: req.params.id })
    .then((reg) => {
      if (reg.length == 0) {
        return res.send({ msg: "Nenhum registro encontrado!" });
      }
      res.send(reg);
    })
    .catch((err) => {
      res.send({ err });
    });
});

module.exports = router;
