import { append, assignDeep, createElement, isElement, isObject, log, replaceChildren, reduce, createFragment, walk, push } from './utils.js'

var tree = {}

const history = [tree]

const attach = (o, t) => (push(o, history), tree = { ...t, ...o })

const create = (tagName, x, ...nodes) =>
  (attach({ [tagName]: [x, ...nodes]}, tree),  // should be the output
  isObject(x)  // should happen later
    ? append(assignDeep(createElement(tagName), x), ...nodes)
    : append(createElement(tagName), x ?? '', ...nodes))

const { main, h1, pre, button, fragment } = reduce(
  ['main', 'h1', 'pre', 'button'],
  (functions, tagName) =>
    ({ ...functions, [tagName]: (x, ...nodes) => create(tagName, x, ...nodes) }),
  { fragment: (...nodes) => append(createFragment(), ...nodes) })

/**
 * TODO:
 *
 * 1. Each element function should output the data used as its input arguments.
 * 2. When `render` is called, the data should first be used to generate the DOM
 *    tree to be merged. The DOM tree should then replace the contents of the
 *    target element (i.e. document.body) in a single operation.
 * 3. After the initial `render()`, calling any element function should cause it
 *    to behave like `render`, with the new target element instead being the
 *    parent of the called function: The data subtree should be built, the DOM
 *    generated, then inserted into the document. It will probably be necessary
 *    to pass in HTML selectors for disambiguation, but also look for any
 *    namespacing possibilities, such as lexical scope, file colocation, and DOM
 *    binding.
 * 4. Further optimizations can be made later to balance multiple small DOM
 *    insertions against regenerating large branches. Consider looking at the
 *    React Fiber algorithm.
 */
const render = (tree, root = document.body) => {
  // walk(tree, node => log(node))  // maybe this will be useful
  replaceChildren(root, tree)  // final step: the actual render
}

const counter = (text = 'Increment', count = 0) =>
  fragment(
    pre({ innerHTML: count, style: { fontSize: '4em' }}),
    button({ onclick: () => counter(text, count + 1) }, text))

render(
  main({ style: { textAlign: 'center' }},
    '~~~~~',
    h1('Recursive counter'),
    counter()))

