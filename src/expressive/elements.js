const tagNames = [
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
]

const { isArray } = Array,
      { keys, entries } = Object

window.store = new Map()

const isObject = x => typeof x === 'object' && !isArray(x) && x !== null

const assignProperties = (baseElement, selector, properties) =>
  entries(properties).reduce((el, [k, v]) =>
    (el[k] = typeof v === 'function'
      ? () => store.get(selector)[k]()
      : v,
    isObject(v)
      && assignProperties(el[k], selector, v),
    el),
  baseElement)

const replaceChildren = (baseElement, childNodes) =>
  (baseElement.replaceChildren(...childNodes), baseElement)

const replaceSubtree = (baseElement, selector, properties, children) =>
  replaceChildren(
    assignProperties(baseElement, selector, properties),
    children)

const selector = (tagName, { id, className }) =>
  tagName
    + (id ? `#${id}`
      : className ? `.${className.split(' ').filter(s => s).join('.')}`
        : '')

const augment = (properties, childNodes) =>
  childNodes.reduce((o, node) =>
    ({ ...o,
       currentChildren:
      [...o.currentChildren,
        isObject(node)
          ? selector(node.tagName.toLowerCase(), node)
          : node] }),
  { ...properties, currentChildren: [] })

const prepare = (tagName, x, childNodes) =>
  ({ tagName,
     ...!isObject(x) || x instanceof Element
       ? { childNodes: [x, ...childNodes],
           properties: augment({}, [x, ...childNodes]),
           selector: selector(tagName, {}) }
       : { childNodes,
           properties: augment(x, childNodes),
           selector: selector(tagName, x) } })

const changed = (x, y) =>
  typeof x !== typeof y
  || (typeof x === 'object' && x !== null
    ? keys({ ...x, ...y }).some(k => changed(x[k], y[k]))
    : typeof x !== 'function'
      && x !== y)

// TODO: Three approaches are possible:
//
// 1. Replace only elements whose properties have changed (current approach).
// 2. Replace individual properties intead of replacing entire elements.
// 3. Replace the called element with its entire subtree, regardless of changes.
//
// Each may be more efficient depending on the number of comparisions to be
// made. Test them all and determine when to use one over the others.
const update = (selector, properties, children) =>
  document.querySelectorAll(selector).forEach(el => el.replaceWith(
    replaceSubtree(el.cloneNode(), selector, properties, children)))

const baseElement = tagName =>
  ['html', 'head', 'body'].includes(tagName)
    ? 'html' === tagName ? document.documentElement : document[tagName]
    : document.createElement(tagName)

const liveElement =
  ({ childNodes, properties, selector, tagName },
    lastProperties = store.get(selector)) =>
    (store.set(selector, properties),
    lastProperties
      && changed(properties, lastProperties)
      && update(selector, properties, childNodes),
    replaceSubtree(
      baseElement(tagName), selector, properties, childNodes))

/**
 * Generates an HTMLElement with children and inserts it into the DOM.
 *
 * @param {string} tagName
 *
 * @param {Partial<HTMLElement> | string | number} [nodeOrProperties]
 * Either an object of [HTMLElement properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#properties)
 * or a child node.
 *
 * @param {...(HTMLElement | string | number)} [childNodes]
 *
 * @returns HTMLElement
 */
export const element = (tagName, nodeOrProperties, ...nodes) =>
  liveElement(prepare(tagName, nodeOrProperties, nodes))

export const el = element

const defaultElements = tagNames.reduce(
  (functions, tagName) =>
    ({ ...functions,
       [tagName]: (nodeOrProperties, ...nodes) =>
         element(tagName, nodeOrProperties, ...nodes) }),
  { doctype: (qualifiedName, publicId = '', systemId = '') =>
    document.implementation
      .createDocumentType(qualifiedName, publicId, systemId),
    fragment: (...childNodes) =>
      replaceChildren(document.createDocumentFragment(), ...childNodes) })

export const {
  doctype, fragment, imgmap,
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
} = defaultElements
