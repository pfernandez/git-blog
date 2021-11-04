import {
  append,
  assignDeep,
  createElement,
  log,
  reduce,
  replaceChildren,
} from './utils.js'

const { div, pre, button } = reduce(
  ['div', 'pre', 'button'],
  (functions, tagName) => ({
    ...functions,
    [tagName]: (attributes = {}) =>
      log(tagName, attributes) &&
      assignDeep(createElement(tagName), attributes),
  }),
  {}
)

const root = div()
append(document.body, root)

const counter = (text = 'Increment counter', count = 0) =>
  replaceChildren(
    root,
    pre({
      innerHTML: count,
      style: { fontSize: '5em', margin: '15px 0' },
    }),
    button({
      innerText: text,
      onclick: () => counter(text, count + 1),
    })
  )
counter()
