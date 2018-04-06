var app = require('./config/server');
var server = app.listen(3000, function(){
  console.log('::(omserver) Express server ON!');
  console.log('::(omserver) Ready on port %d', server.address().port);
  // console.log(':: process.env.PORT' + process.env.PORT);
});
