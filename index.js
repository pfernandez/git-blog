////////////////////////////////////////////////////////////////////////////////
// Utilities


const log = console.log

const each = (list, f) => list.forEach(x => f(x))

const push = (x, list) => list.push(x)

const apply = (f, list) => f.apply(undefined, list)

const reverse = list => [...list].reverse()

const add = (a, b) => a + b

const isFunction = x => typeof x === 'function'

const isData = x => !isFunction(x)

const isList = x => Array.isArray(x)

const self = x => x

////////////////////////////////////////////////////////////////////////////////
// Core


var store = {}

const history = [store]

const assign = x => (push(x, history), store = { ...store, ...x })

const evaluate = ([f, ...rest]) => isFunction(f) ? apply(f, rest) : [f, ...rest]

// FIXME: Start at the leaves
const recurse = list =>
  (each(list, x => isList(x) && evaluate(list) && recurse(x)))


////////////////////////////////////////////////////////////////////////////////
// Application


recurse(
  [log,
    1,
    [add, 1, 1],
    [add, 1,
      [add, 1, 1]]])

