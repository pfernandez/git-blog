import { append, replaceChildren } from './utils.js'
import { div, pre, button } from './dom'

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
