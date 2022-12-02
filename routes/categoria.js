const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

require("../models/Categoria");
const Entidade = mongoose.model("categoria");

router.post("/novo", (req, res) => {
  const novo = {
    nome: req.body.nome,
    icone: req.body.icone,
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
      reg.nome = req.body.nome,
      reg.icone = req.body.icone,
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

router.get("/findall", (req, res) => {
  Entidade.find()
    .sort({ nome: 1 })
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

router.post("/findbynome", (req, res) => {
  Entidade.find(
    { nome: { $regex: new RegExp(req.body.nome), $options: 'i' }}
    )
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
