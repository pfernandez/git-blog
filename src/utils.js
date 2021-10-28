/* eslint-disable no-unused-vars */

const exists = x => typeof x !== undefined

const list = x => Array.isArray(x)

const func = x => typeof x === 'function'

const sfunc = x => list(x) && func(first(x))

const isData = x => !list(x) && !func(x) && !sfunc(x)

const among = (a, f) => a.some(f)

const first = ([x]) => list(x) && x  // car

const push = (x, list) => list.push(x)

const reverse = list => [...list].reverse()

const map = (list, f) => list.map(f)

const assoc = (x, a) => list(a)
  ? a.find(y => list(y) ? y[0] === x : undefined)
  : obj(x) ? a[x] : undefined

const obj = x => typeof x === 'object' && !list(x) && x !== null // = associative list

const atom = x => exists(x) && !list(x)

const λ = (obj, expr) => () => expr(obj) // TODO 

const fn = λ

export {}
