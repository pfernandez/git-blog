const assignProperties = (element, properties) =>
  Object.entries(properties).reduce(
    (el, [k, v]) => {
      try { el[k] = v } catch {}
      typeof v === 'object' && !Array.isArray(v)
        && assignProperties(el[k], v)
      return el },
    element)

const attachSubtree = ({element, properties, childNodes}) =>
  (childNodes.length && element.replaceChildren(...childNodes),
  assignProperties(element, properties))

const baseElement = tagName =>
  'html' === tagName ? document.documentElement
    : ['head', 'body'].includes(tagName) && document[tagName]
        ? document[tagName]
        : 'imgmap' === tagName
          ? document.createElement('map')
          : document.createElement(tagName)

const isProperties = x =>
  typeof x === 'object'
    && !Array.isArray(x)
    && !(x instanceof Node)
    && x !== null

const validChildren = nodes =>
  nodes.filter(x => x !== null && typeof x !== 'undefined')

const prepare = (tagName, x, childNodes) =>
  ({element: baseElement(tagName),
    ...isProperties(x)
      ? {childNodes: childNodes.flat(), properties: x}
      : {childNodes: validChildren([x, ...childNodes].flat()), properties: {}}})

const createElement = (tagName, nodeOrProperties, ...nodes) =>
  attachSubtree(prepare(tagName, nodeOrProperties, nodes))

const getSelector = properties =>
  properties.tagName
    + (properties.id
      ? `#${properties.id}`
      : properties.className
        ? `.${properties.className.split(' ').filter(s => s).join('.')}`
        : '')

const replaceOrReturn = (elements, element) =>
  elements.length
    ? elements.map(el => (el.replaceWith(element), el))
    : element

const isFirstRender = (container = window) =>
  typeof container.LIVE_ELEMENTS_RENDERED === 'undefined'
    ? container.LIVE_ELEMENTS_RENDERED = true : false

/**
 * Replaces all matching elements with a new element if any are found, otherwise
 * creates a new element. An existing element is considered a match if it shares
 * a `tagName` + `id` + `className` combination with the replacement.
 *
 * @param {string} tagName
 *
 * @param {Partial<HTMLElement> | string | number} [nodeOrProperties]
 * Either an object of [HTMLElement properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#properties)
 * or a child node.
 *
 * @param {...(HTMLElement | string | number)} [childNodes]
 *
 * @returns {HTMLElement | HTMLElement[]}
 */
export const element = (tagName, childOrProperties, ...childNodes) =>
  // TODO: Only render root element
  log(isFirstRender())
    ? createElement(tagName, childOrProperties, ...childNodes)
    : replaceOrReturn(
      [...document.querySelectorAll(
        isProperties(childOrProperties)
          ? getSelector({...childOrProperties, tagName})
          : tagName)],
      createElement(tagName, childOrProperties, ...childNodes))

const appendChildren = (element, ...children) =>
  (element.append(...children), element)

const tagNames =
  ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
   'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
   'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del',
   'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset',
   'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
   'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input',
   'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu',
   'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option',
   'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt',
   'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small',
   'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table',
   'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time',
   'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr']

const defaultElements = tagNames.reduce(
  (functions, tagName) =>
    ({...functions,
      [tagName]: (childOrProperties, ...childNodes) =>
        element(tagName, childOrProperties, ...childNodes)}),
  {fragment:
    (...childNodes) =>
      appendChildren(document.createDocumentFragment(), ...childNodes)})

export const
  {fragment, imgmap,
   a, abbr, address, area, article, aside, audio, b, base,
   bdi, bdo, blockquote, body, br, button, canvas, caption,
   cite, code, col, colgroup, data, datalist, dd, del, details,
   dfn, dialog, div, dl, dt, em, embed, fieldset, figcaption,
   figure, footer, form, h1, h2, h3, h4, h5, h6, head,
   header, hgroup, hr, html, i, iframe, img, input, ins, kbd,
   label, legend, li, link, main, mark, menu, meta,
   meter, nav, noscript, object, ol, optgroup, option, output,
   p, param, picture, pre, progress, q, rp, rt, ruby, s,
   samp, script, section, select, slot, small, source, span,
   strong, style, sub, summary, sup, table, tbody, td,
   template, textarea, tfoot, th, thead, time, title, tr,
   track, u, ul, video, wbr} = defaultElements
