'use strict';

const _ = require('underscore');

let dataset = _.map(_.range(10), function(i) {
  return Math.random() * 50;
})

console.log(dataset);
