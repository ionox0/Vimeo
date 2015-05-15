var express = require('express'),
  app       = express(),
  port      = process.env.PORT || 3005;

app.use(express.static('./build'));

app.listen(port, function(){
  console.log('listening on port ' + port);
});

