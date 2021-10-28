const list = x => Array.isArray(x)
const nil = []
const rest = ([_, ...x]) => x.length ? x : nil  // cdr

// TODO: Align the definitions with the paper
const func = x => typeof x === 'function'
const sfunc = x => list(x) && func(first(x))
const first = ([x]) => list(x) && x  // car
//combine = (x, y)  // cons
const apply = (f, x) => f.apply(undefined, list(x) ? x : [x])
const evaluate = x => sfunc(x) ? apply(first(x), rest(x)) : x

// Just helpers
const each = (a, f) => a.forEach(x => f(x))  // could use cad-cdr recursion but...
const leaf = x => list(x) && !sfunc(x)
const last = a => first(a.slice(-1))
const log = (...x) => (console.log(...x), last(x))

const add = (a, b) => a + b

// Figure out and replace evaluate
const recurse = a =>
  leaf(a)
    ? log('*', a, '---->', evaluate(a))
    : each(a, x =>
      log('*', x)
      && sfunc(x)
      && log('-----')
      && recurse(x))

// After this is working, move it to a separate file with // @ts-check at the
// top. If the inputs are initialized there should be no type errors.
recurse(
  [log, 1,
    [add, 1, 1],
    [add, 1, [add, 1, 1]]])
