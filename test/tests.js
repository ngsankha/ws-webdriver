var io = require('socket.io-client'),
    assert = require('assert'),
    http = require('http');

describe('Server', function() {
  describe('HTTP Requests', function() {
    var socket, server;

    before(function(done) {
      server = http.createServer(function(req, res) {
        var data = '';

        req.on('data', function(chunk) {
          data += chunk;
        });

        req.on('end', function() {
          res.end(JSON.stringify({
            method: req.method,
            path: req.url,
            body: data
          }));
        });
      });
      server.listen(4444, function() {
        socket = io.connect('http://localhost:4000');
        socket.on('connect', function() {
          done();
        });
      });
    });

    it('should forward a GET request', function(done) {
      socket.emit('GET', { path: '/wd/hub/status' });
      socket.on('response', function(data) {
        var obj = JSON.parse(data);
        assert.equal(obj.method, 'GET');
        assert.equal(obj.path, '/wd/hub/status');
        socket.removeListener('response');
        done();
      });
    });

    it('should forward a POST request', function(done) {
      socket.emit('POST', { path: '/wd/hub/status' });
      socket.on('response', function(data) {
        var obj = JSON.parse(data);
        assert.equal(obj.method, 'POST');
        assert.equal(obj.path, '/wd/hub/status');
        socket.removeListener('response');
        done();
      });
    });

    it('should forward a POST request with body', function(done) {
      socket.emit('POST', { path: '/wd/hub/status', body: 'LOLOL' });
      socket.on('response', function(data) {
        var obj = JSON.parse(data);
        assert.equal(obj.method, 'POST');
        assert.equal(obj.path, '/wd/hub/status');
        assert.equal(obj.body, 'LOLOL');
        socket.removeListener('response');
        done();
      });
    });

    it('should forward a DELETE request', function(done) {
      socket.emit('DELETE', { path: '/wd/hub/status' });
      socket.on('response', function(data) {
        var obj = JSON.parse(data);
        assert.equal(obj.method, 'DELETE');
        assert.equal(obj.path, '/wd/hub/status');
        socket.removeListener('response');
        done();
      });
    });
  });
});
