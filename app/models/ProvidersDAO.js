var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

function ProvidersDAO(){ }

ProvidersDAO.prototype.insert = function(response, provider){
  MongoClient.connect('mongodb://mongodb:27017', function(err, client){
    if(err) throw err;
    var db = client.db('omdatabase');
    db.collection('providers').insert(provider, function(findErr, records){
      if(findErr) response.json({message: 'erro ao inserir dados'});
      response.status(200).json({
        message: 'fornecedor cadastrado com sucesso',
        records: records
      });
      client.close();
    });
  });
};

ProvidersDAO.prototype.get = function(response, id){
  if(id !== undefined) id = {_id: ObjectId(id)};
  MongoClient.connect('mongodb://mongodb:27017', function(err, client){
    if(err) throw err;
    var db = client.db('omdatabase');
    db.collection('providers').find(id).toArray(function(findErr, results){
      if(err){
        response.send({message: 'erro ao buscar dados'});
      } else {
        response.send({message: 'fornecedores encontrados', data: results});
      }
      client.close();
    });
  });

};

ProvidersDAO.prototype.remove = function(response, id){
  if(id !== undefined) id = {_id: ObjectId(id)};
  MongoClient.connect('mongodb://mongodb:27017', function(err, client){
    if(err) throw err;
    var db = client.db('omdatabase');
    db.collection('providers').remove(id, function(findErr, results){
      if(err){
        response.send({message: 'erro ao remover dados'});
      } else {
        response.send({message: 'fornecedor removido com sucesso', data: results});
      }
      client.close();
    });
  });
};

module.exports = function(){
  return ProvidersDAO;
};
