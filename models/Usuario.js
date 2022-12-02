const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
  nome:     {type: String, required: true, default: "nome" },
  email:    {type: String, required: true, default: "email@email.com" },
  senha:    {type: String, required: true},  
  tipo:     {type: Number, required: true, default: 0 },
  data_cad: {type: String, default: Date.now()},
});

mongoose.model("usuario", Usuario);
