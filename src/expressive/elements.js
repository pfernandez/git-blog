import {
  each,
  entries,
  eq,
  filter,
  instance,
  join,
  keys,
  object as obj,
  reduce,
  slice,
  type
} from '../expressive.js'

const store = new Map()

const changed = (x, y) =>
  !type(x, type(y))
    || (type(x, 'object') && !eq(x, null)
      ? some(keys({ ...x, ...y }), k => changed(x[k], y[k]))
      // Function references always change, so ignore them. In
      // `assignProperties` we point to the last stored function instead.
      : !type(x, 'function') && !eq(x, y))

const disambiguate = (x, childNodes) =>
  ((instance(x, Element) || !obj(x))
    && (childNodes = [x, ...childNodes], x = {}),
  reduce(childNodes,
    (a, node) =>
      instance(node, Element)
        ? [...a, node]
        : [{ ...a[0], innerText: node }, ...slice(a, 1)],
    [x]))

const getSelector = (tagName, { id, className }) =>
  tagName
    + (id
      ? `#${id}`
      : className
        ? `.${join(filter(split(className), s => s), '.')}` // TODO: Regex
        : '')

const assignProperties = (element, selector, properties) =>
  reduce(entries(properties),
    (el, [k, v]) =>
      (el[k] = type(v, 'function') ? () => store.get(selector)[k]() : v,
      obj(v) && assignProperties(el[k], selector, v),
      el),
    element)

const append = (element, children) => (element.append(...children), element)

const appendSubtree = (element, selector, properties, ...children) =>
  append(assignProperties(element, selector, properties), children)

const replaceElements = (selector, properties, children) =>
  each(document.querySelectorAll(selector),
    el => el.replaceWith(
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
export const create = (tagName, nodeOrProperties, ...childNodes) => {
  const [properties, ...children] = disambiguate(nodeOrProperties, childNodes),
        selector = getSelector(tagName, properties),
        lastProperties = store.get(selector)

  store.set(selector, properties)

  lastProperties
    && changed(properties, lastProperties)
    && replaceElements(selector, properties, children)

  return appendSubtree(
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
      append(document.createDocumentFragment(), childNodes),
  })
