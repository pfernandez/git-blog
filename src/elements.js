/** @module expressive/elements */

const { isArray } = Array,
      { keys, entries } = Object

const store = new Map()

const isObject = x =>
  typeof x === 'object' && !isArray(x) && x !== null

const shallowEqual = (a, b) =>
  [...keys(a), ...keys(b)].every(k => a[k] === b[k])

const normalizeArguments = (x, childNodes) =>
  ((x instanceof Element || !isObject(x))
    && (childNodes = [x, ...childNodes], x = {}),
  childNodes.reduce((a, node) =>
    node instanceof Element
      ? [...a, node]
      : [{ ...a[0], innerText: node }, ...a.slice(1)],
  [x]))

const getElementSelector = (tagName, { id, className }) =>
  tagName
    + (id ? `#${id}`
      : className ? `.${className.split(' ').filter(s => s).join('.')}`
        : '')

const assignProperties = (element, properties) =>
  entries(properties).reduce((el, [k, v]) =>
    (el[k] = v, isObject(v) && assignProperties(el[k], v), el),
  element)

const replaceElements = (elements, properties, children) =>
  elements.forEach(el => el.replaceWith(
    appendSubtree(el.cloneNode(), properties, ...children)))

const appendChildren = (element, children) =>
  (element.append(...children), element)

const appendSubtree = (element, properties, ...children) =>
  appendChildren(assignProperties(element, properties), children)

/**
 * Generates an HTMLElement with children and inserts it into the DOM.
 *
 * @param {string} tagName
 * @param {Partial<HTMLElement> | string | number} [x] (optional) HTML
 * properties, i.e. `{ className, style, onclick }`
 * @param {...(HTMLElement | string | number)} [childNodes]
 * @returns HTMLElement
 */
const create = (tagName, x, ...childNodes) => {
  tagName = tagName.toLowerCase()
  const [properties, ...children] = normalizeArguments(x, childNodes),
        selector = getElementSelector(tagName, properties),
        lastProperties = store.get(selector)

  if(!lastProperties)
    store.set(selector, properties)
  else if (!shallowEqual(properties, lastProperties))
    store.set(selector, properties),
    replaceElements(document.querySelectorAll(selector), properties, children)

  return appendSubtree(
    ['html', 'head', 'body'].includes(tagName)
      ? 'html' === tagName ? document.documentElement : document[tagName]
      : document.createElement(tagName),
    properties,
    ...children)}

export const {
  doctype, fragment,
  a, abbr, address, area, article, aside, audio, b, base,
  bdi, bdo, blockquote, body, br, button, canvas, caption,
  cite, code, col, colgroup, data, datalist, dd, del, details,
  dfn, dialog, div, dl, dt, em, embed, fieldset, figcaption,
  figure, footer, form, h1, h2, h3, h4, h5, h6, head,
  header, hgroup, hr, html, i, iframe, img, input, ins, kbd,
  label, legend, li, link, main, map, mark, menu, meta,
  meter, nav, noscript, object, ol, optgroup, option, output,
  p, param, picture, pre, progress, q, rp, rt, ruby, s,
  samp, script, section, select, slot, small, source, span,
  strong, style, sub, summary, sup, table, tbody, td,
  template, textarea, tfoot, th, thead, time, title, tr,
  track, u, ul, video, wbr
} = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
  'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
  'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details',
  'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head',
  'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd',
  'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta',
  'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output',
  'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's',
  'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span',
  'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td',
  'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr',
  'track', 'u', 'ul', 'var', 'video', 'wbr'
].reduce(
  (functions, tagName) =>
    ({ ...functions,
      [tagName]: (x, ...nodes) => create(tagName, x, ...nodes) }),
  {
    doctype: (qualifiedName, publicId = '', systemId = '') =>
      document.implementation.createDocumentType(
        qualifiedName, publicId, systemId),
    fragment: (...childNodes) =>
      appendChildren(document.createDocumentFragment(), childNodes)
  })

/**
 * Recursively descend into a key-value tree and execute a function at each
 * node. Recursion stops when the function returns a falsy value (or all nested
 * children have been visited).
 *
 * @function
 * @param {object} [root=document.body]
 * @param {function} [f=node => (console.log(node), true)]
 * @param {string} [childArrayKey='childNodes']
 */
const walk = (
  root = document.body,
  f = node => (console.log(node), true),
  childArrayKey = 'childNodes'
) => f(root) && root[childArrayKey].forEach(node => walk(node, f))

export { create, walk }
