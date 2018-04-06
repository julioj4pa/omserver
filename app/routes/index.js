module.exports = function(application){

  application.get('/', function(req, res){
    application.app.controllers.index.home(application, req, res);
  });

  // form fornecedores
  // application.get('/providers', function(req, res){
  //   application.app.controllers.providers.show(application, req, res);
  // });

  // application.get('/products', function(req, res){
  //   application.app.controllers.index.home(application, req, res);
  // });

};
