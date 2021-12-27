const { isArray } = Array,
      { keys, entries } = Object

const store = new Map()

const isObject = x => typeof x === 'object' && !isArray(x) && x !== null

const element = tagName =>
  ['html', 'head', 'body'].includes(tagName)
    ? 'html' === tagName ? document.documentElement : document[tagName]
    : document.createElement(tagName)

const assignProperties = (element, selector, properties) =>
  entries(properties).reduce((el, [k, v]) =>
    (el[k] = typeof v === 'function'
      ? () => store.get(selector)[k]()
      : v,
    isObject(v)
      && assignProperties(el[k], selector, v),
    el),
  element)

const appendChildren = (element, childNodes) =>
  (element.append(...childNodes), element)

const appendSubtree = (element, selector, properties, children) =>
  appendChildren(
    assignProperties(element, selector, properties),
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

const disambiguate = (x, nodes) =>
  ((!isObject(x) || x instanceof Element)
    && (nodes = [x, ...nodes], x = {}),
  [x, nodes])

const prepare = (tagName, properties, childNodes) =>
  ({ childNodes,
     properties: augment(properties, childNodes),
     selector: selector(tagName, properties),
     tagName })

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
// made. Test them all and determine when to use one others.
const update = (selector, properties, children) =>
  document.querySelectorAll(selector).forEach(el => el.replaceWith(
    appendSubtree(el.cloneNode(), selector, properties, children)))

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
export const create =
  ({ childNodes, properties, selector, tagName },
    lastProperties = store.get(selector)) =>
    (store.set(selector, properties),
    lastProperties
      && changed(properties, lastProperties)
      && update(selector, properties, childNodes),
    appendSubtree(element(tagName), selector, properties, childNodes))

const tagNames =
  [ 'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
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
    'track', 'u', 'ul', 'var', 'video', 'wbr' ]

const elements = tagNames.reduce(
  (functions, tagName) =>
    ({ ...functions,
       [tagName]: (nodeOrProperties, ...nodes) =>
         create(prepare(tagName, ...disambiguate(nodeOrProperties, nodes))) }),
  { doctype: (qualifiedName, publicId = '', systemId = '') =>
    document.implementation
      .createDocumentType(qualifiedName, publicId, systemId),
    fragment: (...childNodes) =>
      appendChildren(document.createDocumentFragment(), ...childNodes) })

export const
      { doctype, fragment, imgmap,
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
        track, u, ul, video, wbr } = elements
