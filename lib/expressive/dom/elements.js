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

const isProperties = x =>
  typeof x === 'object'
    && !Array.isArray(x)
    && !(x instanceof Node)
    && x !== null

const validChildren = nodes =>
  nodes.filter(x => x !== null && typeof x !== 'undefined')

const getSelector = element =>
  element.tagName
    + (element.id
      ? `#${element.id}`
      : element.className
        ? `.${[...element.classList].join('.')}`
        : '')

const replaceOrReturn = (elements, element) =>
  elements.length
    ? elements.map(el => (el.replaceWith(element), el))
    : element

/**
 * Creates a new DOM element with decendants.
 *
 * @param {string} [tagName]
 *
 * @param {Partial<HTMLElement> | Node} [x]
 * Either an object of [HTMLElement properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#properties)
 * or a child node.
 *
 * @param {Node} [children]
 *
 * @returns HTMLElement
 */
export const createElement = (tagName, x, ...children) => {
  const element = attachSubtree(
    {element: document.createElement(tagName),
     ...isProperties(x)
       ? {childNodes: children.flat(), properties: x}
       : {childNodes: validChildren([x, ...children].flat()), properties: {}}})

  console.log(tagName, 'created')

  return element
}

/**
 * Replaces all matching elements with a new element if any are found, otherwise
 * creates a new element. An existing element is considered a match if it shares
 * a `tagName` + `id` + `className` combination with the replacement. Returns
 * the element.
 *
 * @param {HTMLElement} [element]
 *
 * @returns HTMLElement
 */
export const render = element =>
  replaceOrReturn([...document.querySelectorAll(getSelector(element))], element)

const appendChildren = (element, ...children) =>
  (element.append(...children), element)

const customElements =
  {fragment:
    (...childNodes) =>
      appendChildren(document.createDocumentFragment(), ...childNodes),
   imgmap: (childOrProperties, ...childNodes) =>
     createElement('map', childOrProperties, ...childNodes)}

const tagNames =
  ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
   'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
   'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del',
   'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset',
   'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
   'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input',
   'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'mark', 'menu',
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
        createElement(tagName, childOrProperties, ...childNodes)}),
  customElements)

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
