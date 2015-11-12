var io = require('socket.io-client'),
    assert = require('assert');

describe('Server', function() {
  describe('HTTP Requests', function() {
    var socket;

    before(function(done) {
      socket = io.connect('http://localhost:4000');
      socket.on('connect', function() {
        done();
      });
    });

    it('should forward a GET request', function(done) {
      socket.emit('GET', { path: '/wd/hub/status' });
      socket.on('response', function(data) {
        var obj = JSON.parse(data);
        assert.equal(obj.status, 0);
        done();
      });
    });

    it('should forward a post request');

    it('should forward a delete request');
  });
});
