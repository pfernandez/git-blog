"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.td = exports.tbody = exports.table = exports.sup = exports.summary = exports.sub = exports.style = exports.strong = exports.span = exports.source = exports.small = exports.slot = exports.select = exports.section = exports.script = exports.samp = exports.s = exports.ruby = exports.rt = exports.rp = exports.q = exports.progress = exports.pre = exports.picture = exports.param = exports.p = exports.output = exports.option = exports.optgroup = exports.ol = exports.object = exports.noscript = exports.nav = exports.meter = exports.meta = exports.menu = exports.mark = exports.main = exports.link = exports.li = exports.legend = exports.label = exports.kbd = exports.ins = exports.input = exports.imgmap = exports.img = exports.iframe = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.fragment = exports.form = exports.footer = exports.figure = exports.figcaption = exports.fieldset = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dialog = exports.dfn = exports.details = exports.del = exports.dd = exports.datalist = exports.data = exports.createElement = exports.colgroup = exports.col = exports.code = exports.cite = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.bdo = exports.bdi = exports.base = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.address = exports.abbr = exports.a = void 0;
exports.wbr = exports.video = exports.update = exports.ul = exports.u = exports.track = exports.tr = exports.title = exports.time = exports.thead = exports.th = exports.tfoot = exports.textarea = exports.template = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var assignProperties = function assignProperties(element, properties) {
  return Object.entries(properties).reduce(function (el, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    try {
      el[k] = v;
    } catch (_unused) {}

    _typeof(v) === 'object' && !Array.isArray(v) && assignProperties(el[k], v);
    return el;
  }, element);
};

var attachSubtree = function attachSubtree(_ref3) {
  var element = _ref3.element,
      properties = _ref3.properties,
      childNodes = _ref3.childNodes;
  return childNodes.length && element.replaceChildren.apply(element, _toConsumableArray(childNodes)), assignProperties(element, properties);
};

var baseElement = function baseElement(tagName) {
  return 'html' === tagName ? document.documentElement : ['head', 'body'].includes(tagName) ? document[tagName] : 'imgmap' === tagName ? document.createElement('map') : document.createElement(tagName);
};

var prepare = function prepare(tagName, x, childNodes) {
  return _objectSpread({
    element: baseElement(tagName)
  }, _typeof(x) === 'object' && !(Array.isArray(x) || x instanceof Node) ? {
    childNodes: childNodes.flat(),
    properties: x
  } : {
    childNodes: [x].concat(_toConsumableArray(childNodes)).flat(),
    properties: {}
  });
};
/**
 * Generates an HTMLElement with children and inserts it into the DOM.
 *
 * @param {string} tagName
 *
 * @param {Partial<HTMLElement> | string | number} [nodeOrProperties]
 * Either an object of [HTMLElement properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#properties)
 * or a child node.
 *
 * @param {...(HTMLElement | string | number)} [childNodes]
 *
 * @returns HTMLElement
 */


var createElement = function createElement(tagName, nodeOrProperties) {
  for (var _len = arguments.length, nodes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    nodes[_key - 2] = arguments[_key];
  }

  return attachSubtree(prepare(tagName, nodeOrProperties, nodes));
};

exports.createElement = createElement;

var appendChildren = function appendChildren(element) {
  for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    children[_key2 - 1] = arguments[_key2];
  }

  return element.append.apply(element, children), element;
};

var tagNames = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];
var defaultElements = tagNames.reduce(function (functions, tagName) {
  return _objectSpread(_objectSpread({}, functions), {}, _defineProperty({}, tagName, function (childOrProperties) {
    for (var _len3 = arguments.length, childNodes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      childNodes[_key3 - 1] = arguments[_key3];
    }

    return createElement.apply(void 0, [tagName, childOrProperties].concat(childNodes));
  }));
}, {
  fragment: function fragment() {
    for (var _len4 = arguments.length, childNodes = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      childNodes[_key4] = arguments[_key4];
    }

    return appendChildren.apply(void 0, [document.createDocumentFragment()].concat(childNodes));
  }
});
var fragment = defaultElements.fragment,
    imgmap = defaultElements.imgmap,
    a = defaultElements.a,
    abbr = defaultElements.abbr,
    address = defaultElements.address,
    area = defaultElements.area,
    article = defaultElements.article,
    aside = defaultElements.aside,
    audio = defaultElements.audio,
    b = defaultElements.b,
    base = defaultElements.base,
    bdi = defaultElements.bdi,
    bdo = defaultElements.bdo,
    blockquote = defaultElements.blockquote,
    body = defaultElements.body,
    br = defaultElements.br,
    button = defaultElements.button,
    canvas = defaultElements.canvas,
    caption = defaultElements.caption,
    cite = defaultElements.cite,
    code = defaultElements.code,
    col = defaultElements.col,
    colgroup = defaultElements.colgroup,
    data = defaultElements.data,
    datalist = defaultElements.datalist,
    dd = defaultElements.dd,
    del = defaultElements.del,
    details = defaultElements.details,
    dfn = defaultElements.dfn,
    dialog = defaultElements.dialog,
    div = defaultElements.div,
    dl = defaultElements.dl,
    dt = defaultElements.dt,
    em = defaultElements.em,
    embed = defaultElements.embed,
    fieldset = defaultElements.fieldset,
    figcaption = defaultElements.figcaption,
    figure = defaultElements.figure,
    footer = defaultElements.footer,
    form = defaultElements.form,
    h1 = defaultElements.h1,
    h2 = defaultElements.h2,
    h3 = defaultElements.h3,
    h4 = defaultElements.h4,
    h5 = defaultElements.h5,
    h6 = defaultElements.h6,
    head = defaultElements.head,
    header = defaultElements.header,
    hgroup = defaultElements.hgroup,
    hr = defaultElements.hr,
    html = defaultElements.html,
    i = defaultElements.i,
    iframe = defaultElements.iframe,
    img = defaultElements.img,
    input = defaultElements.input,
    ins = defaultElements.ins,
    kbd = defaultElements.kbd,
    label = defaultElements.label,
    legend = defaultElements.legend,
    li = defaultElements.li,
    link = defaultElements.link,
    main = defaultElements.main,
    mark = defaultElements.mark,
    menu = defaultElements.menu,
    meta = defaultElements.meta,
    meter = defaultElements.meter,
    nav = defaultElements.nav,
    noscript = defaultElements.noscript,
    object = defaultElements.object,
    ol = defaultElements.ol,
    optgroup = defaultElements.optgroup,
    option = defaultElements.option,
    output = defaultElements.output,
    p = defaultElements.p,
    param = defaultElements.param,
    picture = defaultElements.picture,
    pre = defaultElements.pre,
    progress = defaultElements.progress,
    q = defaultElements.q,
    rp = defaultElements.rp,
    rt = defaultElements.rt,
    ruby = defaultElements.ruby,
    s = defaultElements.s,
    samp = defaultElements.samp,
    script = defaultElements.script,
    section = defaultElements.section,
    select = defaultElements.select,
    slot = defaultElements.slot,
    small = defaultElements.small,
    source = defaultElements.source,
    span = defaultElements.span,
    strong = defaultElements.strong,
    style = defaultElements.style,
    sub = defaultElements.sub,
    summary = defaultElements.summary,
    sup = defaultElements.sup,
    table = defaultElements.table,
    tbody = defaultElements.tbody,
    td = defaultElements.td,
    template = defaultElements.template,
    textarea = defaultElements.textarea,
    tfoot = defaultElements.tfoot,
    th = defaultElements.th,
    thead = defaultElements.thead,
    time = defaultElements.time,
    title = defaultElements.title,
    tr = defaultElements.tr,
    track = defaultElements.track,
    u = defaultElements.u,
    ul = defaultElements.ul,
    video = defaultElements.video,
    wbr = defaultElements.wbr;
exports.wbr = wbr;
exports.video = video;
exports.ul = ul;
exports.u = u;
exports.track = track;
exports.tr = tr;
exports.title = title;
exports.time = time;
exports.thead = thead;
exports.th = th;
exports.tfoot = tfoot;
exports.textarea = textarea;
exports.template = template;
exports.td = td;
exports.tbody = tbody;
exports.table = table;
exports.sup = sup;
exports.summary = summary;
exports.sub = sub;
exports.style = style;
exports.strong = strong;
exports.span = span;
exports.source = source;
exports.small = small;
exports.slot = slot;
exports.select = select;
exports.section = section;
exports.script = script;
exports.samp = samp;
exports.s = s;
exports.ruby = ruby;
exports.rt = rt;
exports.rp = rp;
exports.q = q;
exports.progress = progress;
exports.pre = pre;
exports.picture = picture;
exports.param = param;
exports.p = p;
exports.output = output;
exports.option = option;
exports.optgroup = optgroup;
exports.ol = ol;
exports.object = object;
exports.noscript = noscript;
exports.nav = nav;
exports.meter = meter;
exports.meta = meta;
exports.menu = menu;
exports.mark = mark;
exports.main = main;
exports.link = link;
exports.li = li;
exports.legend = legend;
exports.label = label;
exports.kbd = kbd;
exports.ins = ins;
exports.input = input;
exports.img = img;
exports.iframe = iframe;
exports.i = i;
exports.html = html;
exports.hr = hr;
exports.hgroup = hgroup;
exports.header = header;
exports.head = head;
exports.h6 = h6;
exports.h5 = h5;
exports.h4 = h4;
exports.h3 = h3;
exports.h2 = h2;
exports.h1 = h1;
exports.form = form;
exports.footer = footer;
exports.figure = figure;
exports.figcaption = figcaption;
exports.fieldset = fieldset;
exports.embed = embed;
exports.em = em;
exports.dt = dt;
exports.dl = dl;
exports.div = div;
exports.dialog = dialog;
exports.dfn = dfn;
exports.details = details;
exports.del = del;
exports.dd = dd;
exports.datalist = datalist;
exports.data = data;
exports.colgroup = colgroup;
exports.col = col;
exports.code = code;
exports.cite = cite;
exports.caption = caption;
exports.canvas = canvas;
exports.button = button;
exports.br = br;
exports.body = body;
exports.blockquote = blockquote;
exports.bdo = bdo;
exports.bdi = bdi;
exports.base = base;
exports.b = b;
exports.audio = audio;
exports.aside = aside;
exports.article = article;
exports.area = area;
exports.address = address;
exports.abbr = abbr;
exports.a = a;
exports.imgmap = imgmap;
exports.fragment = fragment;

var selector = function selector(el) {
  return el.tagName + (el.id ? "#".concat(el.id) : el.className ? ".".concat(el.className.split(' ').filter(function (s) {
    return s;
  }).join('.')) : '');
};
/**
 * Replaces all matching live elements with a new element, then returns an array
 * of references to the updated elements. An existing element is considered a
 * match if it shares a `tagName` + `id` + `className` combination with the
 * replacement.
 *
 * @param {HTMLElement} element
 * @returns {HTMLElement[]}
 */


var update = function update(element) {
  return _toConsumableArray(document.querySelectorAll(selector(element))).map(function (el) {
    return el.replaceWith(element), el;
  });
};

exports.update = update;