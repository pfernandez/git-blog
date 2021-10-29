/* eslint-disable no-unused-vars */

const log = (...x) => (console.log(...x), last(x))

const nil = []

const exists = x => typeof x !== undefined

const atom = x => exists(x) && !list(x)

const list = x => Array.isArray(x)

const func = x => typeof x === 'function'

const sfunc = x => list(x) && func(first(x))

const leaf = x => list(x) && func(first(x))

const first = ([x]) => x  // car

const rest = ([_, ...x]) => x.length ? x : nil  // cdr

const last = a => first(a.slice(-1))

const obj = x => typeof x === 'object' && !list(x) && x !== null // = associative list

const data = x => !list(x) && !func(x) && !sfunc(x)

const among = (a, f) => a.some(f)

const each = (a, f) => a.forEach(x => f(x))

const map = (a, f) => a.map(f)

const apply = (f, a) => f.apply(undefined, a)

const assoc = (x, a) => list(a)
  ? a.find(y => list(y) ? y[0] === x : undefined)
  : obj(x) ? a[x] : undefined

const reverse = list => [...list].reverse()

const λ = (obj, expr) => () => expr(obj) // TODO

const fn = λ

export {}
