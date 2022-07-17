"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walk = exports.type = exports.sum = exports.split = exports.some = exports.slice = exports.reverse = exports.rest = exports.reduce = exports.partial = exports.parseLisp = exports.or = exports.omit = exports.omap = exports.not = exports.map = exports.log = exports.length = exports.last = exports.keys = exports.join = exports.isString = exports.isObject = exports.isInstance = exports.isFunction = exports.isEmpty = exports.isArray = exports.ifElse = exports.identity = exports.globalize = exports.flat = exports.first = exports.find = exports.filter = exports.exists = exports.every = exports.evaluate = exports.error = exports.eq = exports.entries = exports.each = exports.deepMap = exports.bool = exports.apply = exports.append = exports.and = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var first = function first(_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      array = _ref2[0];

  return array;
};

exports.first = first;

var rest = function rest(_ref3) {
  var _ref4 = _toArray(_ref3),
      _ = _ref4[0],
      array = _ref4.slice(1);

  return array;
};

exports.rest = rest;

var slice = function slice(array, start, end) {
  return array.slice(start, end);
};

exports.slice = slice;

var last = function last(array) {
  return first(slice(array, -1));
};

exports.last = last;

var log = function log() {
  var _console;

  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return (_console = console).log.apply(_console, values), last(values);
};

exports.log = log;

var error = function error(string) {
  throw new Error(string);
};

exports.error = error;

var length = function length(array) {
  return array.length;
};

exports.length = length;

var bool = function bool(value) {
  return !!value;
};

exports.bool = bool;

var eq = function eq(x, y) {
  return x === y;
};

exports.eq = eq;

var and = function and(x, y) {
  return x && y;
};

exports.and = and;

var or = function or(x, y) {
  return x || y;
};

exports.or = or;

var not = function not(value) {
  return !value;
};

exports.not = not;

var ifElse = function ifElse(value, then, otherwise) {
  return value ? then : otherwise;
};

exports.ifElse = ifElse;

var identity = function identity(value) {
  return value;
};

exports.identity = identity;

var exists = function exists(value) {
  return not(type(value, 'undefined'));
};

exports.exists = exists;

var type = function type(value, _type) {
  return _type ? eq(_typeof(value), _type) : _typeof(value);
};

exports.type = type;

var isInstance = function isInstance(value, type) {
  return value instanceof type;
};

exports.isInstance = isInstance;

var isFunction = function isFunction(value) {
  return type(value, 'function');
};

exports.isFunction = isFunction;
var isArray = Array.isArray;
exports.isArray = isArray;

var isString = function isString(value) {
  return typeof value === 'string';
};

exports.isString = isString;

var isObject = function isObject(value) {
  return and(type(value, 'object'), not(eq(value, null)));
};

exports.isObject = isObject;

var isEmpty = function isEmpty(value) {
  return isObject(value) ? !length(isArray(value) ? value : keys(value)) : bool(value);
};

exports.isEmpty = isEmpty;
var keys = Object.keys,
    entries = Object.entries;
exports.entries = entries;
exports.keys = keys;

var some = function some(array, fn) {
  return array.some(fn);
};

exports.some = some;

var every = function every() {
  for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    values[_key2] = arguments[_key2];
  }

  return values.every(function (v) {
    return v;
  });
};

exports.every = every;

var find = function find(array, fn) {
  return array.find(fn);
};

exports.find = find;

var omit = function omit(object, key) {
  return function (_ref5) {
    var _ = _ref5[key],
        o = _objectWithoutProperties(_ref5, [key].map(_toPropertyKey));

    return o;
  }(object);
};

exports.omit = omit;

var each = function each(array, fn) {
  return array.forEach(fn);
};

exports.each = each;

var reduce = function reduce(array, fn, value) {
  return array.reduce(fn, value);
};

exports.reduce = reduce;

var map = function map(array, fn) {
  return array.map(fn);
};

exports.map = map;

var omap = function omap(object, fn) {
  return reduce(entries(object), function (o, _ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        k = _ref7[0],
        v = _ref7[1];

    return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, k, fn(v)));
  }, {});
};

exports.omap = omap;

var deepMap = function deepMap(value, fn) {
  return isArray(value) ? map(value, function (v) {
    return deepMap(v, fn);
  }) : isObject(value) ? omap(value, function (v) {
    return deepMap(v, fn);
  }) : fn(value);
};

exports.deepMap = deepMap;

var split = function split(array, separator, limit) {
  return array.split(separator, limit);
};

exports.split = split;

var filter = function filter(array, fn) {
  return array.filter(fn);
};

exports.filter = filter;

var join = function join(array, separator) {
  return array.join(separator);
};

exports.join = join;

var append = function append(value, array) {
  return _toConsumableArray(array).push(value);
};

exports.append = append;

var apply = function apply(fn, array) {
  return fn.apply(null, array);
};

exports.apply = apply;

var partial = function partial(fn) {
  for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    values[_key3 - 1] = arguments[_key3];
  }

  return fn.bind.apply(fn, [null].concat(values));
};

exports.partial = partial;

var reverse = function reverse(array) {
  return _toConsumableArray(array).reverse();
};

exports.reverse = reverse;

var flat = function flat(array, depth) {
  return array.flat(depth);
};

exports.flat = flat;

var sum = function sum() {
  for (var _len4 = arguments.length, values = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    values[_key4] = arguments[_key4];
  }

  return values.reduce(function (x, y) {
    return x + y;
  });
};

exports.sum = sum;

var walk = function walk(root, f) {
  return each(f(root), function (node) {
    return walk(node, f);
  });
};

exports.walk = walk;

var globalize = function globalize(object) {
  return each(entries(object),
  /* global global, window */
  function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        k = _ref9[0],
        v = _ref9[1];

    return window ? window[k] = v : global[k] = v;
  });
};
/**
 * Recursively evaluates an array expression.
 *
 * * If first element in the array is a function, the array is a "function
 * application". The remaining elements will be passsed to it as its arguments.
 * * Any arguments that themselves are function applications will be evaluated
 * first, and so on down the tree.
 * * Array expressions without a leading function are treated as data and
 * returned unaffected. Any function applications they contain will _not_ be
 * evaluated.
 *
 * @param {array} [f, ...rest]
 * @returns {*} The the result of the evaluated array expression.
 *
 * @example
 * evaluate(
 *   [log,
 *     1,
 *     [sum, 1, 1],
 *     [sum,
 *       1,
 *       [sum, 1, 1]]])  // -> 1 2 3
 */


exports.globalize = globalize;

var evaluate = function evaluate(_ref10) {
  var _ref11 = _toArray(_ref10),
      fn = _ref11[0],
      rest = _ref11.slice(1);

  return apply(fn, map(rest, function (value) {
    return !(isArray(value) && isFunction(first(value))) ? value : evaluate(value);
  }));
}; // TODO: Keep necessary spaces and combine regexes.


exports.evaluate = evaluate;

var parseLisp = function parseLisp(string) {
  return eval(string.replace(/\n/g, ' ').split(' ').filter(function (s) {
    return s;
  }).join().replace(/\(/g, '[').replace(/\)/g, ']'));
};
/*
evaluate(parseLisp(`
  (log
    1
    (sum 1 1)
    (sum
      1
      (sum 1 1)))
`))
*/


exports.parseLisp = parseLisp;