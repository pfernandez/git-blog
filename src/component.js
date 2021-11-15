import {
  append, assignDeep, createElement, createFragment,
  getElementById, isElement, isObject, log, reduce, replaceChildren, walk
} from './utils.js'

export const {body} = document

export const create = (tagName, x, ...nodes) => ({
    element = isObject(x) && !isElement(x)
      ? (append(assignDeep(createElement(tagName), x), ...nodes))
      : append(createElement(tagName), x ?? '', ...nodes)
} = {}) => log(element)




export const {main, h1, pre, button, fragment} = reduce
['main', 'h1', 'pre', 'button'],
(functions, tagName) =>
  ({...functions, [tagName]: (x, ...nodes) => create(tagName, x, ...nodes)}),
  {fragment: (...nodes) => append(createFragment(), ...nodes)}

export const counter = (text = 'Increment', count = 0) =>
  fragment(
    pre({innerHTML: count, style: {fontSize: '4em'}}),
    button({onclick: () => counter(text, count + 1)}, text))

export const app = () =>
  main({style: {textAlign: 'center'}},
    h1('Recursive counter'),
    counter())

const tree = app()

//walk(tree, log)

replaceChildren(body, tree)

