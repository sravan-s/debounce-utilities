var assert = require('chai').assert

var deb = require('./');

describe('Simple Debounce', function() {
  describe('Sample', function() {
    it('should run only once in 500 ms', function(done) {
      var val = 200;
      var debouncedFn = deb.debounce(function() {
        val += 1;
        done(assert.equal(val, 201));
      }, 501);

      for(var  i = 0; i < 5; i++) {
        setTimeout(function() {
          debouncedFn();
        }, i * 100);
      }
    });
  });
});

describe('Throttled Debounce', function() {
  describe('Throttled Debounce Assertion', function() {
    it('should run at start and end', function(done) {
      var val;
      var debouncedFn = deb.throttledDebounce(function() {
        val = 0;
      }, function() {
        val += 1;
        done(assert.equal(val, 1));
      }, 500);

      for(var  i = 0; i < 5; i++) {
        setTimeout(function() {
          debouncedFn();
        }, i * 100);
      }
    });
  });
});

describe('Reduced Debounce', function() {
  describe('Reduced Debounce Assertion', function() {
    it('should run at every iteration', function(done) {
      var val;
      var debouncedFn = deb.reducedDebounce(function() {
        val = 0;
      }, function() {
        val += 1;
      }, function() {
        done(assert.equal(val, 5));
      }, 500);

      for(var  i = 0; i < 5; i++) {
        setTimeout(function() {
          debouncedFn();
        }, i * 100);
      }
    });
  });
});
