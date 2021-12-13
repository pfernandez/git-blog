import './elements/global.js'

const counter = (count = 0) =>
  div(
    pre(count),
    button(
      { onclick: () => counter(count + 1) },
      'Increment'))

body(counter())
