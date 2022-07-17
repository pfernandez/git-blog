"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathname = exports.on = exports.navigateTo = void 0;
var on = addEventListener;
exports.on = on;

var navigateTo = function navigateTo(pathname) {
  return history.pushState({}, '', pathname);
};

exports.navigateTo = navigateTo;
var _location = location,
    pathname = _location.pathname;
exports.pathname = pathname;