export const
  log = (...x) => (console.log(...x), x.slice(-1)[0]),

  nil = [],

  first = ([x]) => x,

  rest = ([_, ...x]) => x.length ? x : nil,

  last = a => first(a.slice(-1)),

  exists = x => typeof x !== undefined,

  isArray = x => Array.isArray(x),

  isFunction = x => typeof x === 'function',

  isObject = x => typeof x === 'object' && !isArray(x) && x !== null,

  isData = x => !(isArray(x) && isFunction(first(x))),

  some = (a, f) => a.some(f),

  among = some,

  entries = o => Object.entries(o),

  reduce = (a, f, v) => a.reduce(f, v),

  map = (a, f) => a.map(f),

  mapObject = (o, f) => reduce(entries(o), (_, [k, v]) => f(k, v), {}),

  forEach = (a, f) => a.forEach(f),

  each = forEach,

  apply = (f, a) => f.apply(undefined, a),

  assoc = (x, a) => isArray(a)
    ? a.find(y => isArray(y) ? y[0] === x : undefined)
    : isObject(x) ? a[x] : undefined,

  reverse = list => [...list].reverse(),

  evaluate = ([f, ...a]) => apply(f, map(a, x => isData(x) ? x : evaluate(x))),

  fn = (obj, expr) => () => expr(obj), // TODO

  λ = fn,

  add = (x, y) => x + y,

  createElement = name => document.createElement(name),

  assign = (target, source) => Object.assign(target, source),

  assignDeep = (target, source) =>
    reduce(
      entries(source),
      (t, [k, v]) => (t[k] = v, isObject(v) && assignDeep(t[k], v), t),
      target),

  append = (parent, ...elements) => parent.append(...elements),

  replaceChildren = (parent, ...children) => parent.replaceChildren(...children)

