var debouncers = {};

// Basic debounce function
// Taken from https://remysharp.com/2010/07/21/throttling-function-calls
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
debouncers.debounce = function(fn, delay) {
  var timer = null;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

// Trottled debounce executes `fnA` at first time an event occurs
// debounces everything else and executes `fnB` after timeout
debouncers.throttledDebounce = function(fnA, fnB, timeout, context) {
  context || (context = this);
  var timer = null;
  var firstTime = true;
  return function() {
    var args = arguments;
    if (firstTime) {
      fnA.apply(context, args);
      firstTime = false;
    }
    clearTimeout(timer);
    timer = setTimeout(function() {
      fnB.apply(context, args);
      firstTime = true;
    }, timeout);
  }
}

// A reduced debounce accepts three functions
// `bootstrapFn` is called when the function is called within first time of the timeout
// `reducerFn` is executed each time an event occurs afterwards
// `endFunction` is executed when the last time the event occurs within timout
debouncers.reducedDebounce = function(bootstrapFn, reducerFn, endFunction, timeout, context) {
  context || (context = this);
  var timer = null;
  var firstTime = true;
  return function() {
    var args = arguments;
    if (firstTime) {
      bootstrapFn.apply(context, args);
      firstTime = false;
    } else {
      reducerFn.apply(context, args);
    }
    clearTimeout(timer);
    timer = setTimeout(function() {
      endFunction.apply(context, args);
      firstTime = true;
    }, timeout);
  }
}

module.exports = debouncers;
