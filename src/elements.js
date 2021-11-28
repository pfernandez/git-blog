/** @module expressive/elements */

const { isArray } = Array,
      { keys, entries } = Object

const propertyStore = new Map()

const isObject = x =>
  typeof x === 'object'
    && !isArray(x)
    && x !== null

const shallowEqual = (a, b) =>
  [...keys(a), ...keys(b)].every(k => a[k] === b[k])

const normalizeArguments = (x, children) =>
  isObject(x) && !(x instanceof Element)
    ? [x, children]
    : [{}, [x, ...children]]

const getElementSelector = (tagName, { id, className }) =>
  tagName + id ? `#${id}`
    : className ? `.${className.split(' ').filter(s => s).join('.')}`
      : ''

const assignProperties = (element, properties) =>
  (keys(properties).length
    && entries(properties).reduce((el, [k, v]) =>
      (el[k] = v, isObject(v) && assignProperties(el[k], v), el),
    element),
  element)

const appendSubtree = (element, properties, children) => (
  assignProperties(element, properties),
  element.append(...children),
  element)

const replaceElements = (elements, properties, children) =>
  elements.forEach(el => el.replaceWith(
    appendSubtree(el.cloneNode(true), properties, children)))

/**
 * Generates an HTMLElement with children and inserts it into the DOM.
 *
 * @param {string} tagName
 * @param {Partial<HTMLElement> | string | number} [x] (optional) HTML
 * properties, i.e. `{ className, style, onclick }`
 * @param {...(HTMLElement | string | number)} [children]
 * @returns HTMLElement
 */
const create = (tagName, x, ...children) => {
  const [properties, childNodes] = normalizeArguments(x, children),
        selector = getElementSelector(tagName, properties),
        lastProperties = propertyStore.get(selector),
        liveElements = []

  if(lastProperties && !shallowEqual(properties, lastProperties)) {
    liveElements.concat(...document.querySelectorAll(selector))
    replaceElements(liveElements, properties, children)
    propertyStore.set(selector, properties)
  }

  return appendSubtree(
    liveElements.length
      ? liveElements[0].cloneNode()
      : document.createElement(tagName),
    properties,
    childNodes)
}

export const {
  body, fragment,
  a, abbr, address, area, article, aside, audio, b, base,
  bdi, bdo, blockquote, br, button, canvas, caption,
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
  'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas', 'caption',
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
    ({
      ...functions,
      [tagName]: (x, ...nodes) => create(tagName, x, ...nodes)
    }),
  {
    body: (x, ...children) => {
      const [properties, childNodes] = normalizeArguments(x, children)
      appendSubtree(document.body, properties, childNodes)
      return document.body
    },

    fragment: (...children) =>
      document.createDocumentFragment().append(...children)
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
