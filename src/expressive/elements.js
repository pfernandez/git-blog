const { isArray } = Array,
      { keys, entries } = Object

const store = new Map()

const isObject = x => typeof x === 'object' && !isArray(x) && x !== null

const omit = (object, key) => (({ [key]: _, ...o }) => o)(object)

const changed = (x, y) =>
  typeof x !== typeof y
    || (typeof x === 'object' && x !== null
      ? keys({ ...x, ...y }).some(k => changed(x[k], y[k]))
      // Function references always change, so ignore them. In
      // `assignProperties` we point to the last stored function instead.
      : typeof x !== 'function'
        && x !== y)

const prepare = (x, childNodes) =>
  ((x instanceof Element || !isObject(x))
    && (childNodes = [x, ...childNodes], x = {}),
  childNodes.reduce((a, node) =>
    isObject(node) && node.tagName
      ? [...a, node]
      : [{ ...a[0], innerText: node }, ...a.slice(1)],
  [x]))

const getSelector = (tagName, { id, className }) =>
  tagName
    + (id ? `#${id}`
      : className ? `.${className.split(' ').filter(s => s).join('.')}`
        : '')

const assignProperties = (element, selector, properties) =>
  entries(properties).reduce((el, [k, v]) =>
    (el[k] = typeof v === 'function' ? () => store.get(selector)[k]() : v,
    isObject(v) && assignProperties(el[k], selector, v),
    el),
  element)

const appendChildren = (element, children) =>
  (element.append(...children), element)

const appendSubtree = (element, selector, properties, ...children) =>
  appendChildren(assignProperties(element, selector, properties), children)

// TODO: Three approaches are possible:
//
// 1. Replace only elements whose properties have changed (current approach).
// 2. Replace individual properties intead of replacing entire elements.
// 3. Replace the called element with its entire subtree, regardless of changes.
//
// Each may be more efficient depending on the number of comparisions to be
// made. Test them all and determine when to use one others.
const update = (selector, properties, children) =>
  document.querySelectorAll(selector).forEach(el => el.replaceWith(
    appendSubtree(el.cloneNode(), selector, properties, ...children)))

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
export const create = (tagName, x, ...childNodes) => {
  const [properties, ...children] = prepare(x, childNodes),
        selector = getSelector(tagName, properties),
        lastProperties = store.get(selector),
        shouldUpdate = lastProperties && changed(properties, lastProperties)
  store.set(selector, properties)

  return lastProperties
    ? shouldUpdate
      ? update(selector, omit(properties, 'tagName'), children)
      : { ...properties, tagName }
    : appendSubtree(
      ['html', 'head', 'body'].includes(tagName)
        ? 'html' === tagName ? document.documentElement : document[tagName]
        : document.createElement(tagName),
      selector,
      properties,
      ...children)}

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
       [tagName]: (nodeOrProperties, ...nodes) =>
         create(tagName, nodeOrProperties, ...nodes) }),
  {
    doctype: (qualifiedName, publicId = '', systemId = '') =>
      document.implementation.createDocumentType(
        qualifiedName, publicId, systemId),

    fragment: (...childNodes) =>
      appendChildren(document.createDocumentFragment(), childNodes),
  })
