var http = require('http'),
    packageJson = require('./package.json'),
    config = require('./config.json');

var server = http.createServer(function(req, res) {
  res.end(JSON.stringify({ name: packageJson.name, version: packageJson.version }));
});

var io = require('socket.io')(server);

var httpRequest = function(method, path, body, callback) {
  console.log(method + ':', path);
  var options = {
    host: config.webdriverHost,
    port: config.webdriverPort,
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
    if (typeof body === 'string')
      req.write(body);
    else
      req.write(JSON.stringify(body));
  }
  req.end();
}

io.on('connection', function(socket){
  console.log('Accepted incoming connection.');

  socket.on('GET', function(msg) {
    httpRequest('GET', msg.path, undefined, function(data) {
      socket.emit('response', data);
    });
  });

  socket.on('POST', function(msg) {
    httpRequest('POST', msg.path, msg.body, function(data) {
      socket.emit('response', data);
    });
  });

  socket.on('DELETE', function(msg) {
    httpRequest('DELETE', msg.path, undefined, function(data) {
      socket.emit('response', data);
    });
  });

  socket.on('disconnect', function() {
    console.log('Client disconnected.')
  });

  socket.on('error', function(err) {
    console.log(err);
  });
});

server.listen(config.port, function() {
  console.log("Listening on port %d.", config.port);
});
