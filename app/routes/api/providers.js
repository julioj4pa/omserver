module.exports = function(application){

  application.post('/api/providers', function(request, response){
    application.app.controllers.providers
      .insert(application, request, response);
  });

  application.get('/api/providers', function(request, response){
    application.app.controllers.providers
      .get(application, request, response);
  });

  application.get('/api/providers/:id', function(request, response){
    application.app.controllers.providers
      .get(application, request, response);
  });

  application.delete('/api/providers/:id', function(request, response){
    application.app.controllers.providers
      .remove(application, request, response);
  });

};
