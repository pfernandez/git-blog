import { append, assignDeep, createElement, createFragment, getElementById, isElement, isObject, log, reduce, render, replaceChildren, replaceElement, replaceWith, querySelector, walk } from './utils.js'


export const create = (tagName, x, ...nodes) => {
  const element = isObject(x) && !isElement(x)
    ? append(assignDeep(createElement(tagName), x), ...nodes)
    : append(createElement(tagName), x ?? '', ...nodes)
  const { id, localName } = element
  const liveElement = querySelector(id ? `#${id}` : localName)
  liveElement && log('replacing', localName) && replaceWith(liveElement, element)
  return element
}


export const {main, h1, pre, button, fragment} = reduce(
  ['main', 'h1', 'pre', 'button'],
  (functions, tagName) =>
    ({...functions, [tagName]: (x, ...nodes) => create(tagName, x, ...nodes)}),
  {fragment: (...nodes) => append(createFragment(), ...nodes)})


const counter = (text = 'Increment', count = 0) =>
  create('counter', { id: 'counter-1' },
    pre({innerHTML: count, style: {fontSize: '4em'}}),
    button({onclick: () => counter(text, count + 1)}, text))


const tree = () =>
  main({style: {textAlign: 'center'}},
    h1('Recursive counter'),
    counter())


render(tree(), 'body')

