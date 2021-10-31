/* eslint-disable no-undef */

log = (...x) => (console.log(...x), x.slice(-1)[0])
reducible = (x) => Array.isArray(x) && typeof x[0] === 'function'
apply = (f, a) => f.apply(undefined, a)
evaluate = ([f, ...a]) =>
  apply(
    f,
    a.map((x) => (reducible(x) ? evaluate(x) : x))
  )

//λ = (x) => log(x) && evaluate(x)

//evaluate([λ, expr({ x: 1, y: 1 }), x + y])


const createElement = (name='div') => document.createElement(name),
      assign = (target, source) => Object.assign(target, source),
      append = (parent, ...elements) => parent.append(...elements),
      replaceChildren = (parent, ...elements) =>
        parent.replaceChildren(...elements)

const div = createElement()
append(document.body, div)

const counter = (text = 'Increment counter', count = 0) =>
  replaceChildren(
    div,
    assign(
      createElement('pre'), {
        innerHTML: count
      }),
    assign(
      createElement('button'), {
        innerText: 'Increment counter',
        onclick: () => counter(text, count + 1)
      }))

counter()
