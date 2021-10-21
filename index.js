////////////////////////////////////////////////////////////////////////////////
// Utilities


const log = console.log

const forEach = function(list, f) { list.forEach(x => f(x)) }

const push = (x, list) => list.push(x)

const apply = (f, list) => Reflect.apply(f, undefined, list)

const add = ({ a, b }) => a + b


////////////////////////////////////////////////////////////////////////////////
// Core


var store = {}

const history = [store]

const assign = x => (push(x, history), store = { ...store, ...x })

const evaluate = ([f, ...args]) => apply(f, args) // TODO: Recurse


////////////////////////////////////////////////////////////////////////////////
// Application


apply(
  forEach, [[
    1,
    apply(
      add, [{
        a: 1,
        b: 1 }]),
    apply(
      add, [{
        a: 1,
        b: apply(
          add, [{
            a: 1,
            b: 1 }])}])],
  log])

evaluate([
  log,
  assign({ foo: 'bar' }),
  assign({ baz: 'qux' }),
  history])

