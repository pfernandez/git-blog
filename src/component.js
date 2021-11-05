import { assignDeep,
         createElement,
         reduce,
         replaceChildren } from './utils.js'

const { pre, button } = reduce(
  ['pre', 'button'],
  (functions, tagName) =>
    ({ ...functions,
       [tagName]: (attributes = {}) =>
         assignDeep(createElement(tagName), attributes) }),
  {})

export const counter = (text = 'Increment counter', count = 0) =>
  replaceChildren(document.body,
    pre({ innerHTML: count, style: { fontSize: '5em', margin: '15px 0' }}),
    button({ innerText: text, onclick: () => counter(text, count + 1) }))

