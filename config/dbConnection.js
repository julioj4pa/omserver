var mongo = require('mongodb');

var mongoConnection = function(){
  var databaseName = 'omdb';
  var serverInstance = new mongo.Server('localhost', 27017, {});
  var options = {};
  var connection = new mongo.Db(databaseName, serverInstance, options);
  return connection;
};

module.exports = function(){ return mongoConnection; };

/*
NOTA! Por questões de compatibilidade e pressa, foi realizado downgrade
da versão do mongodb da v. "^3.0.5" para "^2.2.29".

Problema com a função 'open'.

*/

// TODO fazer upgrade da versão e atualizar código
