export const first = ([array]) => array

export const rest = ([_, ...array]) => array

export const slice = (array, start, end) => array.slice(start, end)

export const last = array => first(slice(array, -1))

export const omit = (object, key) => (({ [key]: _, ...o }) => o)(object)

export const log = (...values) => (console.log(...values), last(values))

export const length = array => array.length

export const eq = (x, y) => x === y

export const bool = value => !!value

export const type = (value, type) => type ? typeof value === type : typeof value

export const identity = value => value

export const instance = (value, type) => value instanceof type

export const exists = value => !type(value, 'undefined')

export const isFunction = value => type(value, 'function')

export const { isArray } = Array

export const isObject = value =>
  type(value, 'object') && !isArray(value) && value !== null

export const isEmpty = value =>
  isArray(value)
    ? !length(value) : isObject(value)
      ? !length(keys(value)) : bool(value)

export const { keys, entries } = Object

export const some = (array, fn) => array.some(fn)

export const reduce = (array, fn, value) => array.reduce(fn, value)

export const map = (array, fn) => array.map(fn)

export const omap = (object, fn) =>
  reduce(entries(object), (_, [k, v]) => fn(k, v), {})

export const deepMap = (value, fn) =>
  isArray(value)
    ? map(value, v => deepMap(v, fn))
    : type(value, 'object') && value !== null
      ? reduce(entries(value),
        (o, [k, v]) => ({ ...o, [k]: deepMap(v, fn) }),
        {})
      : fn(value)

export const split = (array, separator, limit) => array.split(separator, limit)

export const filter = (array, predicate) => array.filter(predicate)

export const join = (array, separator) => array.join(separator)

export const push = (value, array) => array.push(value)

export const each = (array, fn) => array.forEach(fn)

export const apply = (fn, array) => fn.apply(null, array)

export const partial = (fn, ...values) => fn.bind(null, ...values)

export const reverse = array => [...array].reverse()

export const sum = (...values) => values.reduce((x, y) => x + y)

export const walk = (root, f) => each(f(root), node => walk(node, f))

export const globalize = object =>
  each(entries(object),
    /* global global, window */
    ([k, v]) => window ? window[k] = v : global[k] = v)

/**
 * Recursively evaluates an array expression.
 *
 * * If first element in the array is array function, the array is array "function
 * expression". The remaining elements will be passsed to it as its arguments.
 * * Any arguments that themselves are function expressions will be evaluated
 * first, and so on down the tree.
 * * Arrays without array leading function are treated as data and returned
 * unaffected. Any function expressions they contain will _not_ be evaluated.
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
export const evaluate = ([fn, ...rest]) =>
  apply(fn,
    map(rest, value =>
      !(isArray(value) && isFunction(first(value)))
        ? value : evaluate(value)))
