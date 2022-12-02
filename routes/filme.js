const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

require("../models/Filme");
const Entidade = mongoose.model("filme");

router.post("/novo", (req, res) => {
  const novo = {
    titulo: req.body.titulo,
    classificacao: req.body.classificacao,
    duracao: req.body.duracao,
    idioma: req.body.idioma,
    nacionalidade: req.body.nacionalidade,
    legendas: req.body.legendas,
    informacao: req.body.informacao,
    produtora: req.body.produtora,
    formato: req.body.formato,
    franquia: req.body.franquia,
    qualidade: req.body.qualidade,
    tamanho: req.body.tamanho,
    critica: req.body.critica,
    resenha: req.body.resenha,
    diretor: req.body.diretor,
    link_trailer: req.body.link_trailer,
    link_capa: req.body.link_capa,

    categorias: req.body.categorias,
    atores: req.body.atores,
    links: req.body.links,

    lancamento: req.body.lancamento,
    downloads: req.body.downloads,
    data_cad: req.body.data_cad,
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
    (reg.titulo = req.body.titulo),
      (reg.classificacao = req.body.classificacao),
      (reg.duracao = req.body.duracao),
      (reg.idioma = req.body.idioma),
      (reg.nacionalidade = req.body.nacionalidade),
      (reg.legendas = req.body.legendas),
      (reg.informacao = req.body.informacao),
      (reg.produtora = req.body.produtora),
      (reg.formato = req.body.formato),
      (reg.franquia = req.body.franquia),
      (reg.qualidade = req.body.qualidade),
      (reg.tamanho = req.body.tamanho),
      (reg.critica = req.body.critica),
      (reg.resenha = req.body.resenha),
      (reg.diretor = req.body.diretor),
      (reg.link_trailer = req.body.link_trailer),
      (reg.link_capa = req.body.link_capa),
      (reg.categorias = req.body.categorias),
      (reg.atores = req.body.atores),
      (reg.links = req.body.links),
      (reg.lancamento = req.body.lancamento),
      (reg.downloads = req.body.downloads),
      (reg.data_cad = req.body.data_cad),
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

router.get("/findall/:id", (req, res) => {
  let page = req.query.page || 0;
  let perPage = req.query.perPage || 0;
  let find = {};
  if (req.params.id !== "999") {
    find = { "categorias._id": req.params.id };
    console.log("aqui", req.params.id);
  }
  console.log("categoria: ", find);
  Entidade.find(find)
    .limit(perPage)
    .skip(perPage * page)
    .sort({ titulo: 0 })
    .then((reg) => {
      if (reg.length == 0) {
        return res.send({ msg: "Nenhum registro encontrado!" });
      }

      // const obj = reg;
      //   reg.length > 0
      //     ? {
      //         lenght: reg.length,
      //         item: reg.map((ret) => {
      //           return {
      //             nome: ret.titulo,
      //           };
      //         }),
      //       }
      //     : {
      //         mensagem: "nenhum registro",
      //       };

      res.send(reg);
    })
    .catch((err) => {
      res.send({ err });
    });
});

// router.get("/findallCategoria", (req, res) => {
//   Entidade.aggregate([
//     {
//       $lookup: {
//         from: "Filme",
//         localField: "categorias",
//         foreignField: "_id",
//         as: "categoria",
//       },
//     },
//   ]).then((reg) => {
//       if (reg.length == 0) {
//         return res.send({ msg: "Nenhum registro encontrado!" });
//       }
//       res.send(  JSON.stringify(reg)  );
//     })
//     .catch((err) => {
//       res.send({ err });
//     });
// });

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

router.get("/findbytitulo", (req, res) => {
  let filter = req.query.filter || "";
  let find = { $regex: new RegExp(filter), $options: "i" };
  console.log("name: ", find);

  Entidade.find({
    titulo: find,
  })
    .limit(5)
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

router.post("/findbycritica", (req, res) => {
  console.log("limte", req.body.limite);
  Entidade.find({ critica: { $ne: 0 } })

    .sort({ critica: -1 })
    .limit(req.body.limite || 5)
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

router.post("/findbyatores", (req, res) => {
  Entidade.find({
    "atores.nome": { $regex: new RegExp(req.body.atores), $options: "i" },
  })
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

router.get("/length/:id", (req, res) => {
  let find = {};
  if (req.params.id !== "999") {
    find = { "categorias._id": req.params.id };
    console.log("aqui", req.params.id);
  }

  Entidade.find(find)
    .sort({ titulo: 0 })
    .then((reg) => {
      let total = reg.length || 0;
      if (reg.length == 0) {
        return res.send({ total });
      }
      res.send({ total });
    })
    .catch((err) => {
      res.send({ err });
    });
});

module.exports = router;
