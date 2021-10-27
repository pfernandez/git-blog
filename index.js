
exists = x => typeof x !== undefined
list = x => Array.isArray(x)
obj = x => typeof x === 'object' && !list(x) && x !== null // = associative list
atom = x => exists(x) && !list(x)
nil = []
rest = ([_, ...x]) => x.length ? x : nil  // cdr

// TODO: Align the definitions with the paper
first = ([x]) => list(x) && x  // car
//combine = (x, y)  // cons
func = x => typeof x === 'function'
sfunc = x => list(x) && func(first(x))
among = (a, f) => a.some(f)
apply = (f, x) => f.apply(undefined, list(x) ? x : [x])
evaluate = x => flist(x) ? apply(first(x), rest(x)) : x

// Just helpers
each = (a, f) => a.forEach(x => f(x))  // could use cad-cdr recursion but...
leaf = x => list(x) && !among(x, expr)
last = a => first(a.slice(-1))
log = (...x) => (console.log(...x), last(x))
add = (a, b) => a + b

// Figure out and replace evaluate
recurse = a =>
  isLeaf(a)
    ? log('*', a, '---->', evaluate(a))
    : each(a, x =>
        log('*', x)
        && isFunctionList(x)
        && log('-----')
        && recurse(x))

recurse(
  [log,
    1,
    [add, 1, 1],
    [add, 1, [add, 1, 1]]])

log(1, 2, 3, 4)
