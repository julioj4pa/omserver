var mongo = require('mongodb');

var mongoConnection = function(){
  var databaseName = 'omdb';
  var serverInstance = new mongo.Server('localhost', 27017, {});
  var options = {};
  return new mongo.Db(databaseName, serverInstance, options);
}

module.exports = function(){ return mongoConnection }