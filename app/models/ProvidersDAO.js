var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;

function ProvidersDAO(){

}

ProvidersDAO.prototype.insert = function(response, provider){
  console.log('::ProvidersDAO.insert()');
  MongoClient.connect('mongodb://mongodb:27017', function(err, client){
    console.log('::MongoClient connected');
    if(err) throw err;
    // MongoNetworkError: failed to connect to server [localhost:27017]
    // on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]

    console.log('::no errors');
    var db = client.db('omdatabase');
    db.collection('providers').insert(provider, function(findErr, records){
      if(findErr) response.json({message: 'erro ao inserir dados'});
      console.log('::records');
      console.log(records);
      response.status(200).json({
        message: 'fornecedor cadastrado com sucesso'
      });
      client.close();
    });
  });


  // this._connection.open(function(err, mongoclient){
  //   mongoclient.collection('providers', function(err, collection){
  //     collection.insert(provider, function(err, records){
  //       console.log(records);
  //       if(err){
  //         response.json({message: 'erro ao inserir dados'});
  //       } else {
  //         response.status(200).json({
  //           message: 'fornecedor cadastrado com sucesso'
  //         });
  //       }
  //       mongoclient.close();
  //     });
  //   });
  // });
};

ProvidersDAO.prototype.get = function(response, id){
  if(id !== undefined){
    id = {_id: objectId(id)};
  }
  this._connection.open(function(err, mongoclient){
    mongoclient.collection('providers', function(err, collection){
      collection.find(id).toArray(function(err, results){
        if(err){
          response.send({message: 'erro ao buscar dados'});
        } else {
          response.send({message: 'fornecedores encontrados', data: results});
        }
        mongoclient.close();
      });
    });
  });
};

ProvidersDAO.prototype.remove = function(response, id){
  id = {_id: objectId(id)};
  this._connection.open(function(err, mongoclient){
    mongoclient.collection('providers', function(err, collection){
      collection.remove(id, function(err, results){
        if(err){
          response.send({message: 'erro ao buscar dados'});
        } else {
          response.send({message: 'fornecedores encontrados', data: results});
        }
        mongoclient.close();
      });
    });
  });
};

module.exports = function(){
  return ProvidersDAO;
};
