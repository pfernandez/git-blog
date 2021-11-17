import {append, assignDeep, createElement, createFragment, each, getElementsByProperties, isElement, isObject, log, reduce, render, replaceWith} from './utils.js'

let firstElement

export const create = (tagName, x, ...children) => {

  const element = createElement(tagName)

  isObject(x) && !isElement(x)
    ? append(assignDeep(element, x), ...children)
    : append(element, x ?? '', ...children)

  const liveElements = getElementsByProperties({...x, tagName})

  log('create:', tagName, 'x:', x, 'children:', children)

  // TODO: Should only replace first element. Could diff x and nodes.
  each([...liveElements], el => {
    log('live:', el, 'child:', el?.firstChild)
    log('new:', element, 'child:', element.firstChild)

    el && replaceWith(el, element)
  })

  return element
}

export const {main, h1, div, pre, button, fragment} = reduce(
  ['main', 'h1', 'div', 'pre', 'button'],
  (functions, tagName) =>
    ({...functions, [tagName]: (x, ...nodes) => create(tagName, x, ...nodes)}),
  {fragment: (...nodes) => append(createFragment(), ...nodes)})


export const counter = (id = 'start', text = 'Increment', count = 0) =>
  div({id},
    pre({innerHTML: count, style: {fontSize: '4em'}}),
    button({onclick: () => counter(id, text, count + 1)}, text))


const app = () =>
  main({style: {textAlign: 'center'}},
    h1('Recursive counter'),
    counter())


render(app(), 'body')

