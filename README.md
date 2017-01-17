# debounce-utilities

[![Build Status](https://travis-ci.org/sravan-s/debounce-utilities.svg?branch=master)](https://travis-ci.org/sravan-s/debounce-utilities)

 A set of js functions to manipulate impulsive actions

### Examples
```````````````````````````````````````````````

var deb = require('debounce-utilities');

var debScroll = deb.debounce(function(e) {
  console.log('scroll');
}, 100);

var handleScroll = deb.throttledDebounce(function(e) {
  console.log('first', +new Date(), e);
}, function(e) {
  console.log('last', +new Date(), e);
}, 100, this);
window.addEventListener('mousewheel', handleScroll);

var total;
var reducedScroll = deb.reducedDebounce(function(e) {
  total = 0;
}, function(e) {
  total += e.deltaY;
}, function(e) {
  total += e.deltaY;
  console.log(total);
}, 100);
window.addEventListener('mousewheel', reducedScroll);
