"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.determinePagination = determinePagination;
require("core-js/modules/es.array.push.js");
function determinePagination(i, n) {
  let d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  var r = [];
  var go = 1;
  if (n <= d) {
    // Show any pages
    for (var k = 1; k <= n; k++) {
      r.push(k);
    }
  } else if (i <= d / 2 + 2) {
    // Show first pages then dots then end
    for (var k = 1; k <= d; k++) {
      r.push(k);
    }
    go = k + Math.floor(d / 2);
    go = go >= n ? n - 1 : go;
    r.push({
      go
    });
    r.push(n);
  } else if (i > d / 2 + 2 && i < n - d / 2 - 1) {
    // Show first page then dots then middles the dotd then end
    var k0 = i - Math.floor(d / 2);
    r.push(1);
    go = k0 - Math.floor(d / 2);
    go = go <= 1 ? 2 : go;
    r.push({
      go
    });
    for (var k = k0; k < i + d / 2; k++) {
      r.push(k);
    }
    go = k + Math.floor(d / 2);
    go = go >= n ? n - 1 : go;
    r.push({
      go
    });
    r.push(n);
  } else {
    // Show first page then dots then ends
    var k0 = n - d;
    r.push(1);
    go = k0 - Math.floor(d / 2);
    go = go <= 1 ? 2 : go;
    r.push({
      go
    });
    for (var k = n - d + 1; k <= n; k++) {
      r.push(k);
    }
  }
  return r;
}