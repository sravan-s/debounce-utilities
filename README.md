# debounce-utilities

[![Build Status](https://travis-ci.org/sravan-s/debounce-utilities.svg?branch=master)](https://travis-ci.org/sravan-s/debounce-utilities)

 A set of js functions to manipulate impulsive actions

### Examples
```````````````````````````````````````````````

var deb = require('debounce-utilities');

// deb.debounce(delayedFunction, delay, context);
// delayedFunction will be called once within the delay interval with given context
// context defaults to 'this'
var debScroll = deb.debounce(function(e) {
  console.log('scroll');
}, 100);

// deb.throttledDebounce(intialFunction, finalFunction, delay, context)
// intialFunction function is called at the first trigger
// finalFunction is executed at the last time it's triggered
// within the delay timespan
var handleScroll = deb.throttledDebounce(function(e) {
  console.log('first', +new Date(), e);
}, function(e) {
  console.log('last', +new Date(), e);
}, 100, this);
window.addEventListener('mousewheel', handleScroll);

// deb.reducedDebounce(intialFunction, reducerFunction, finalFunction, delay, context)
// intialFunction function is called at the first trigger
// reducerFunction is called everytime it's triggerd(including intial and final times)
// finalFunction is executed at the last time it's triggered
// within the delay timespan
var total;
var reducedScroll = deb.reducedDebounce(function(e) {
  total = 0;
}, function(e) {
  total += e.deltaY;
}, function(e) {
  console.log(total); // sum total of deltaYs within a 100ms scroll is printed
}, 100);
window.addEventListener('mousewheel', reducedScroll);
