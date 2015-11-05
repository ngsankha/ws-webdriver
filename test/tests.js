var io = require('socket.io-client'),
    assert = require('assert');

describe('Server', function() {
  it('should emit connect on successful connection', function(done) {
    var socket = io.connect('http://localhost:4000');
    socket.on('connect', function() {
      socket.disconnect();
      done();
    });
  });
});
