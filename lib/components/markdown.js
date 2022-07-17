"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _coreMin = _interopRequireDefault(require("../lib/highlight/es/core.min.js"));

var _javascriptMin = _interopRequireDefault(require("../lib/highlight/es/languages/javascript.min.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var registerLanguage = _coreMin["default"].registerLanguage,
    highlight = _coreMin["default"].highlight;
registerLanguage('javascript', _javascriptMin["default"]);

var parseCodeBlock = function parseCodeBlock(str, language) {
  return language === 'live-js' ? highlight(str, {
    language: 'javascript'
  }).value : highlight(str, {
    language: language
  }).value;
};

var config = {
  html: true,
  linkify: true,
  highlight: parseCodeBlock
};

var md = function md() {
  var markdown = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return createElement('md', _objectSpread({
    innerHTML: markdownit(config).render(markdown)
  }, props));
};
/**
 * Because inline scripts have already been run, rerendering them (i.e. when
 * navigating away from, then back to content without a page refresh) will cause
 * redecalaration errors for any `const` or `let` statements. To work around
 * this we suppress errors during all script injections after the initial load
 * by causing `window.onerror` to return `false`.
 */


var loaded = false;
var temp = window.onerror;

var replaceScripts = function replaceScripts(el) {
  return el.querySelectorAll('script, .language-live-js').forEach(function (s) {
    return s.tagName.toLowerCase() === 'script' ? s.replaceWith(script(s.innerText)) : s.after(script(s.innerText));
  });
};

var injectScripts = function injectScripts(el) {
  return window.onerror = function () {
    return loaded;
  }, replaceScripts(el), window.onerror = temp, loaded = true;
};

var injectMarkdown = function injectMarkdown(el) {
  return update(el), injectScripts(el);
};

var renderMarkdown = function renderMarkdown(markdown, props) {
  return fetch(markdown).then(function (response) {
    return response.text();
  }).then(function (markdown) {
    return injectMarkdown(md(markdown, props));
  })["catch"](function (result) {
    return isString(result) ? update(md(markdown, props)) : console.error(result);
  }), md('', props);
};

var _default = function _default(markdown, props) {
  return renderMarkdown(markdown, props);
};

exports["default"] = _default;