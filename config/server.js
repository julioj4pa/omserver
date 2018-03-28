// importação das dependencias
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var session = require('express-session');
var consign = require('consign');
var objectId = require('mongodb').ObjectId;
var multiparty = require('connect-multiparty');
var fileSystem = require('fs');

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
app.use( multiparty() );


// configura consign (autoload de novos conteúdos)
consign()
  .include('app/routes')
  .then('config/dbConnection.js')
  .then('app/models')
  .then('app/controllers')
  .into(app);




// configura headers API RESTFul
app.use(function(req, res, next){
  // cross domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// conexão com o banco de dados
var dbConnection = app.config.dbConnection;

// APIs (refatorar código depois) ----------------------------------------------
app.get('/api/', function(req, res){
  res.send({ message: 'Oh yes, wait a minute Mr. Postman' });
});

app.post('/api/providers', function(req, res){
  var data = req.body;
  dbConnection.open(function(err, mongoclient){
    mongoclient.collection('providers', function(err, collection){
      collection.insert(data, function(err, records){
        if(err){
          res.json({status: 'erro ao inserir dados'});
        } else {
          res.json({status: 'fornecedor cadastrado com sucesso'});
        }
        mongoclient.close();
      });
    });
  });
});


// TODO providers
// post
// get
// get/:id
// delete

// TODO products
// post
// get
// get/:id
// delete


// -----------------------------------------------------------------------------

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