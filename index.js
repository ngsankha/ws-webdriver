var http = require('http');

var server = http.createServer(function(req, res) {
  res.end(JSON.stringify({ name: 'ws-socket', version: '0.0.1' }));
});

var io = require('socket.io')(server);

var httpRequest = function(method, path, body, callback) {
  console.log(method.toUpperCase() + ':', path);
  var options = {
    host: 'localhost',
    port: 4444,
    method: method,
    path: path
  }
  var req = http.request(options, function(res) {
    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      console.log('RESPONSE:', data);
      callback(data);
    });
  });

  req.on('error', function(err) {
    console.log('ERROR: ' + e.message);
  });

  if (typeof body !== 'undefined') {
    req.write(body);
  }
  req.end();
}

io.on('connection', function(socket){
  console.log('Accepted incoming connection.');

  socket.on('get', function(msg) {
    httpRequest('get', msg.path, undefined, function(data) {
      socket.emit('response', data);
    });
  });

  socket.on('post', function(msg) {
    httpRequest('post', msg.path, msg.body, function(data) {
      socket.emit('response', data);
    });
  });

  socket.on('delete', function(msg) {
    httpRequest('delete', msg.path, undefined, function(data) {
      socket.emit('response', data);
    });
  });

  socket.on('disconnect', function() {
    console.log('Client disconnected.')
  });
});

server.listen(4000, function() {
  console.log("Listening on port 4000.");
});
