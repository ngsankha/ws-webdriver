var http = require('http');

var server = http.createServer(function(req, res) {
  res.end(JSON.stringify({ name: 'ws-socket', version: '0.0.1' }));
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('Accepted incoming connection.');

  socket.on('get', function(msg) {

  });

  socket.on('post', function(msg) {

  });

  socket.on('delete', function(msg) {

  });

  socket.on('disconnect', function() {
    console.log('Client disconnected.')
  });
});

server.listen(4000, function() {
  console.log("Listening on port 4000.");
});
