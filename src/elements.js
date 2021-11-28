/** @module expressive/elements */

let temp = null, indent = '*'

const visualizeTree = root =>
  walk(root, node => (console.log(indent, node), indent += '*'))

const shouldReplace = liveElements => {

  /**
   * TODO: The following works but
   *   - only when a single matching live element is found
   *   - queries the DOM for every element in the subtree
   *   - makes me feel dirty inside
   */
  for(const el of liveElements) {
    if(!temp) {
      temp = el.parentElement
    }

    if(el === temp) {
      console.log('ready to render!')

      temp = null
      // return true
    } }

  return true
}

const isObject = x => typeof x === 'object' && !Array.isArray(x) && x !== null

const normalizeArguments = (x, children) =>
  isObject(x) && !(x instanceof Element)
    ? [x, children] : [{}, [x, ...children]]

const getMatchingDOMElements = (tagName, properties) =>
  properties.id ? [document.getElementById(properties.id)]
    : [...properties.className
      ? document.getElementsByClassName(properties.className)
      : document.getElementsByTagName(tagName)]

const assignProperties = (target, source) =>
  Object.keys(source).length
    ? Object.entries(source).reduce((t, [k, v]) =>
      (t[k] = v, isObject(v) && assignProperties(t[k], v), t), target)
    : undefined

const appendSubtree = (element, properties, children) =>
  (assignProperties(element, properties), element.append(...children))

const replaceElements = (liveElements, element, x, children) =>
  liveElements.forEach(el => {
    const newElement = element.cloneNode(true)
    appendSubtree(newElement, { ...x, className: 'replaced' }, children)
    el.replaceWith(newElement)})

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
  const [properties, childNodes] = normalizeArguments(x, children)

  const newElement = document.createElement(tagName)
  appendSubtree(newElement, properties, childNodes)

  const liveElements = getMatchingDOMElements(tagName, properties)
  if(liveElements.length) {
    replaceElements(liveElements, newElement, properties, childNodes)
  }

  return newElement
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
