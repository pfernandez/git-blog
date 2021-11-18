import {div, p, button, main} from './utils.js'


const counter = (count = 0) =>
  div(
    p({style: {fontSize: '1em'}}, count),
    button({onclick: () => counter(count + 1)}, 'Increment'))


document.body.append(main('Recursive counter', counter()))

