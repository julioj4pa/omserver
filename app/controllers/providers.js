module.exports.show = function(application, req, res){
  res.send('exibir fornecedores cadastrados aqui');
}

module.exports.insert = function(application, req, res){
  var form_data = req.body;
  console.log(form_data);
  res.send(form_data);
}