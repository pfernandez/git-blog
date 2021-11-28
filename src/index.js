import { body, button, div, h1, main, p, pre } from './elements.js'


const counter = (count = 0) =>
  div(
    pre({
      style:
      { fontSize: '4em',
        margin: '20px 0' },
      innerText: count
    }),
    button(
      { innerText: 'Increment',
        onclick: () => counter(count + 1) }))

body(
  { style:
    { background: '#222',
      color: '#eee',
      textAlign: 'center' } },
  main(
    h1('Recursive counter'),
    counter(),
    counter()))

