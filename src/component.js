import {append, assignDeep, createElement, isElement, isObject, log, replaceChildren, reduce, createFragment, walk, push, isEmpty} from './utils.js'

window.tree = {}

const history = [tree]

const store = (o, t) => (push(o, history), tree = {...t, ...o})

const create = (tagName, x, ...nodes) =>  // rename?
  store({
    [tagName]: isObject(x) ?
      {...x, ...!isEmpty(nodes) && {childNodes: nodes}}
      : {childNodes: [x, ...nodes]}
  }, tree)

// const create = (tagName, x, ...nodes) =>
// (isObject(x)  // should happen later
//  ? append(assignDeep(createElement(tagName), x), ...nodes)
//  : append(createElement(tagName), x ?? '', ...nodes))

const {main, h1, div, pre, button} = reduce(
  ['main', 'h1', 'div', 'pre', 'button'],
  (functions, tagName) =>
    ({...functions, [tagName]: (x, ...nodes) => create(tagName, x, ...nodes)}),
  {})

const render = (tree, root = document.body) => {
  walk(tree, node => log(node))
  //replaceChildren(root, tree)  // final step: the actual render
}

const counter = (text = 'Increment', count = 0) =>
  div(
    pre({innerText: count, style: {fontSize: '4em'}}),
    button({onclick: () => counter(text, count + 1)}, text))

render(
  main({style: {textAlign: 'center'}},
    '~~~~~',
    h1('Recursive counter'),
    counter()))

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
 *
 * After starting on the above steps, the same problem comes up: The nodes have
 * no way to access the parent when it's time to attach. Committing this for
 * reference, then trying an approach of builing the tree leaves-first as
 * before, then walking it root-first, adding a `parent` property to each node.
 * It may be helpful to include conditions within the DOM functions to handle
 * plain objects when the DOM API isn't available. This could yeild the data
 * tree described above in testing environments, while the actual DOM tree would
 * _be_ the tree in a browser environment.
 */

