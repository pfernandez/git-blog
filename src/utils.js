/** @module expressive/utils */

export const log = (...x) => (console.log(...x), x.slice(-1)[0])

export const nil = []

export const first = ([x]) => x

export const rest = ([_, ...x]) => x.length ? x : nil

export const last = a => first(a.slice(-1))

export const length = x => x.length

export const bool = x => !!x

export const exists = x => !(typeof x === 'undefined')

export const { isArray } = Array

export const { keys, entries } = Object

export const isFunction = x => typeof x === 'function'

export const isObject = x => typeof x === 'object' && !isArray(x) && x !== null

export const isEmpty = x =>
  isArray(x) ? !length(x) : isObject(x) ? !length(keys(x)) : bool(x)

export const isData = x => !(isArray(x) && isFunction(first(x)))

export const some = (a, f) => a.some(f)

export const among = some

export const reduce = (a, f, v) => a.reduce(f, v)

export const map = (a, f) => a.map(f)

export const omap = (o, f) => reduce(entries(o), (_, [k, v]) => f(k, v), {})

export const push = (x, a) => a.push(x)

export const each = (a, f) => a.forEach(f)

export const apply = (f, a) => f.apply(null, a)

export const assoc = (x, a) => isArray(a)
  ? a.find(y => isArray(y) ? y[0] === x : undefined)
  : isObject(x) ? a[x] : undefined

export const partial = (f, ...rest) => f.bind(null, ...rest)

export const reverse = a => [...a].reverse()

export const fn = (obj, expr) => () => expr(obj) // TODO

export const λ = fn

export const add = (x, y) => x + y

/**
 * Recursively evaluates an array expression.
 *
 * * If first element in the array is a function, the array is a "function
 * expression". The remaining elements will be passsed to it as its arguments.
 * * Any arguments that themselves are function expressions will be evaluated
 * first, and so on down the tree.
 * * Arrays without a leading function are treated as data and returned
 * unaffected. Any function expressions they contain will _not_ be evaluated.
 *
 * @param {array} [f, ...rest]
 * @returns {*} The the result of the evaluated array expression.
 *
 * @example
 * evaluate(
 *   [log,
 *     1,
 *     [add, 1, 1],
 *     [add,
 *       1,
 *       [add, 1, 1]]])  // -> 1 2 3
 */
export const evaluate = ([f, ...rest]) =>
  apply(f, map(rest, x => isData(x) ? x : evaluate(x)))
