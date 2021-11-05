export const log = (...x) => (console.log(...x), x.slice(-1)[0])

export const nil = []

export const first = ([x]) => x

export const rest = ([_, ...x]) => x.length ? x : nil

export const last = a => first(a.slice(-1))

export const exists = x => typeof x !== undefined

export const isArray = x => Array.isArray(x)

export const isFunction = x => typeof x === 'function'

export const isObject = x => typeof x === 'object' && !isArray(x) && x !== null

export const isData = x => !(isArray(x) && isFunction(first(x)))

export const some = (a, f) => a.some(f)

export const among = some

export const entries = o => Object.entries(o)

export const reduce = (a, f, v) => a.reduce(f, v)

export const map = (a, f) => a.map(f)

export const mapObject = (o, f) =>
  reduce(entries(o), (_, [k, v]) => f(k, v), {})

export const forEach = (a, f) => a.forEach(f)

export const each = forEach

export const apply = (f, a) => f.apply(undefined, a)

export const assoc = (x, a) => isArray(a)
  ? a.find(y => isArray(y) ? y[0] === x : undefined)
  : isObject(x) ? a[x] : undefined

export const reverse = list => [...list].reverse()

export const evaluate = ([f, ...a]) =>
  apply(f, map(a, x => isData(x) ? x : evaluate(x)))

export const fn = (obj, expr) => () => expr(obj) // TODO

export const λ = fn

export const add = (x, y) => x + y

export const createElement = name => document.createElement(name)

export const assign = (target, source) => Object.assign(target, source)

export const assignDeep = (target, source) => reduce(
  entries(source),
  (t, [k, v]) => (t[k] = v, isObject(v) && assignDeep(t[k], v), t),
  target)

export const append = (parent, ...elements) => parent.append(...elements)

export const replaceChildren = (parent, ...children) =>
  parent.replaceChildren(...children)

