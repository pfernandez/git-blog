import { append, assignDeep, createElement, createFragment, getElementById, isElement, isObject, log, reduce, render, replaceChildren, replaceElement, walk } from './utils.js'


export const create = (tagName, x, ...nodes) =>
  isObject(x) && !isElement(x)
    ? (append(assignDeep(createElement(tagName), x), ...nodes))
    : append(createElement(tagName), x ?? '', ...nodes)


export const {main, h1, pre, button, fragment} = reduce(
  ['main', 'h1', 'pre', 'button'],
  (functions, tagName) =>
    ({...functions, [tagName]: (x, ...nodes) => create(tagName, x, ...nodes)}),
    {fragment: (...nodes) => append(createFragment(), ...nodes)})


const counter = (text = 'Increment', count = 0) =>
  create('counter',
    pre({innerHTML: count, style: {fontSize: '4em'}}),
    button({onclick: () =>
      replaceElement('counter', counter(text, count + 1))},
      text))


const tree = () =>
  main({style: {textAlign: 'center'}},
    h1('Recursive counter'),
    counter())


render(tree(), 'body')

