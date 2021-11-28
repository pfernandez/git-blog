import { body, button, div, main, p } from './elements.js'

const counter = (count = 0) =>
  div(
    p(count),
    button({ onclick: () => counter(count + 1) }, 'Increment'))

const style = { color: '#eee', background: '#222', }

body({ style },
  main('Recursive counter',
    counter(),
    counter()))

