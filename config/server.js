// importação das dependencias
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// inicia e configura objeto express
var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

// configura consign (autoload de novos conteúdos)
consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .into(app);

// exporta o objeto app
module.exports = app;