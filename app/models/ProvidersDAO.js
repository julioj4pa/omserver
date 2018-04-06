var objectId = require('mongodb').ObjectId;

function ProvidersDAO(connection){
  this._connection = connection();
}

ProvidersDAO.prototype.insert = function(response, provider){
  this._connection.open(function(err, mongoclient){
    mongoclient.collection('providers', function(err, collection){
      collection.insert(provider, function(err, records){
        console.log(records);
        if(err){
          response.json({message: 'erro ao inserir dados'});
        } else {
          response.status(200).json({
            message: 'fornecedor cadastrado com sucesso'
          });
        }
        mongoclient.close();
      });
    });
  });
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
