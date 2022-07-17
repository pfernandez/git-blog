"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _markdown = _interopRequireDefault(require("./markdown.js"));

var _index = _interopRequireDefault(require("../posts/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(pathname) {
  return createElement('post', article((0, _markdown["default"])(_index["default"][pathname].filename)));
};

exports["default"] = _default;