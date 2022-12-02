const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//--------------------
// filme
//--------------------
const Filme = new Schema({
  titulo:         {type: String,required: true},
  classificacao:  {type: Number, default: 12},
  duracao:        {type: Number},
  idioma:         {type: String},
  nacionalidade:  {type: String},
  legendas:  		  {type: String},
  informacao:  	  {type: String},
  produtora:  	  {type: String},
  formato:  		  {type: String},
  franquia:  		  {type: String},
  qualidade:  		{type: String},
  tamanho:  		  {type: Number},
  critica:  		  {type: Number, default: 1},
  resenha:  		  {type: String},
  diretor:  		  {type: String},
  link_trailer:  	{type: String},
  link_capa:  		{type: String},

  categorias:     {type: Array},
  atores:         {type: Array},
  links:          {type: Array},

  lancamento:  	  {type: Number, default: 9999},
  downloads:		  {type: Number, default: 0},
  data_cad:       {type: String,default: Date.now()},
});
mongoose.model("filme", Filme);
//--------------------
// filme comentarios
//--------------------
const Filme_Comentarios = new Schema({
  filme_id: {
    type: Schema.Types.ObjectId, 
    ref: "filme", 
    required: true,
  },
  comentario:     {type: String,  required: true},
  nome:           {type: String,  required: true},
  email:          {type: String},
  data:           {type: String,default: Date.now()},
});
mongoose.model("filme_comentarios", Filme_Comentarios);
