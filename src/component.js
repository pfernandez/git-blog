import {
  append,
  createElement,
  replaceChildren,
  assign,
  assignDeep } from './utils.js'

const div = createElement('div')

append(document.body, div)

let counter = (text = 'Increment counter', count = 0) =>
  replaceChildren(
    div,
    assignDeep(
      createElement('pre'), {
        innerHTML: count,
        style: {
          fontSize: '5em',
          margin: '15px 0'
        } }),
    assign(
      createElement('button'), {
        innerText:text,
        onclick: () => counter(text, count + 1)
      })
  )

counter()
