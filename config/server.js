// importação das dependencias
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');
// var session = require('express-session');
var consign = require('consign');
// var multiparty = require('connect-multiparty');
// var fileSystem = require('fs');

// inicia e configura objeto express
var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

// middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-urlencoded parser
app.use(bodyParser.json());                       // application/json parser
// TODO (recomendado) configurar parser por rotas @ https://github.com/expressjs/body-parser#express-route-specific
app.use(validator());
// app.use(session(getSessionParams()));
// app.use(multiparty());

// configura headers API RESTFul
app.use(function(request, response, next){
  // cross domain
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// configura consign (autoload de novos conteúdos)
consign()
  .include('app/routes')
  .then('config/dbConnection.js')
  .then('app/models')
  .then('app/controllers')
  .into(app);



// APIs (refatorar DAO depois) ------------------------------------------------
// app.get('/api/', function(req, res){
//   res.send({ message: 'Oh yes, wait a minute Mr. Postman' });
// });

// ProductsDAO
// app.post('/api/products', function(req, res){ /* ... */ });
// app.get('/api/products', function(req, res){ /* ... */ });
// app.get('/api/products/:id', function(req, res){ /* ... */ });
// app.delete('/api/products/:id', function(req, res){ /* ... */ });



// -----------------------------------------------------------------------------

// exporta o objeto app
module.exports = app;



// function getSessionParams(){
//   return {
//     secret: '0cf0607937013cb58d79a7d3c59d4e11',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {}
//     // cookie: { secure: true } --recomendado, porém exige https
//   };
// }