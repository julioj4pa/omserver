// importação das dependencias
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var session = require('express-session');
var consign = require('consign');

// inicia e configura objeto express
var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-urlencoded parser
app.use(bodyParser.json());                       // application/json parser
// TODO (recomendado) configurar parser por rotas @ https://github.com/expressjs/body-parser#express-route-specific
app.use( validator() );
app.use( getSession() );

// configura consign (autoload de novos conteúdos)
consign()
  .include('app/routes')
  .then('config/dbConnection.js')
  .then('app/models')
  .then('app/controllers')
  .into(app);

// exporta o objeto app
module.exports = app;



function getSession(){
  var params = {
    secret: '0cf0607937013cb58d79a7d3c59d4e11',
    resave: false,
    saveUninitialized: false,
    cookie: {}
    // cookie: { secure: true } --recomendado, porém exige https
  };
  return session(params);
}