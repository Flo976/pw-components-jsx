"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = getData;
exports.getIndex = getIndex;
exports.subscribe = subscribe;
require("core-js/modules/es.array.push.js");
var _pwComponentsCoreDev = require("pw-components-core-dev");
var timings = [];
var timingIndexes = [];
function getIndex(input) {
  return timingIndexes.indexOf(input);
}
function getData(input) {
  var index = getIndex(input);
  if (index == -1) {
    index = subscribe(input);
  }
  var {
    data = {}
  } = timings[index];
  return data;
}
function subscribe(input) {
  timingIndexes.push(input);
  var data = {
    index: 0,
    id: _pwComponentsCoreDev.Random.generateToken()
  };
  timings.push({
    input,
    data
  });
  return getIndex(input);
}