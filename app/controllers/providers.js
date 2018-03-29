module.exports.insert = function(application, request, response){
  var connection = application.config.dbConnection;
  var ProvidersDAO = new application.app.models.ProvidersDAO(connection);
  var provider = request.body;

  request.assert('name', 'Preencher nome').notEmpty();
  request.assert('responsible', 'Preencher responsável').notEmpty();
  request.assert('email', 'Preencher email').notEmpty();
  request.assert('phone', 'Preencher telefone').notEmpty();
  request.assert('cellphone', 'Preencher celular').notEmpty();

  var errors = request.validationErrors();
  console.log(provider);

  if(errors.length > 0){
    response.render('index', {validation: errors, provider: provider});
    return;
  }

  ProvidersDAO.insert(response, provider);
}

/*
  {
    "name": "Nicolas Maraval Medalhas",
    "responsible": "Nicolas Maraval",
    "email": "contato@maravalmedalhas.com.br",
    "phone": "1133333333",
    "cellphone": "11999999999",
    "description": "Acessorios"
  }
*/

module.exports.get = function(application, request, response){
  var connection = application.config.dbConnection;
  var ProvidersDAO = new application.app.models.ProvidersDAO(connection);
  var id = request.params.id;
  ProvidersDAO.get(response, id);
}

module.exports.remove = function(application, request, response){
  var connection = application.config.dbConnection;
  var ProvidersDAO = new application.app.models.ProvidersDAO(connection);
  var id = request.params.id;
  ProvidersDAO.remove(response, id);
}
