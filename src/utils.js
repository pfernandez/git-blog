export const log = (...x) => (console.log(...x), x.slice(-1)[0])

export const nil = []

export const first = ([x]) => x

export const rest = ([_, ...x]) => x.length ? x : nil

export const last = a => first(a.slice(-1))

export const keys = x => Object.keys(x)

export const length = x => x.length

export const bool = x => !!x

export const isType = (x, type) => typeof x === type

export const exists = x => !isType(x, 'undefined')

export const isArray = x => Array.isArray(x)

export const isFunction = x => isType(x, 'function')

export const isObject = x => isType(x, 'object') && !isArray(x) && x !== null

export const isEmpty = x =>
  isArray(x) ? !length(x) : isObject(x) ? !length(keys(x)) : bool(x)

export const isData = x => !(isArray(x) && isFunction(first(x)))

export const isElement = x => x instanceof Element

export const some = (a, f) => a.some(f)

export const among = some

export const entries = o => Object.entries(o)

export const reduce = (a, f, v) => a.reduce(f, v)

export const map = (a, f) => a.map(f)

export const omap = (o, f) => reduce(entries(o), (_, [k, v]) => f(k, v), {})

export const push = (x, a) => a.push(x)

export const each = (a, f) => a.forEach(f)

export const apply = (f, a) => f.apply(null, a)

export const assoc = (x, a) => isArray(a)
  ? a.find(y => isArray(y) ? y[0] === x : undefined)
  : isObject(x) ? a[x] : undefined

export const partial = (f, ...rest) => f.bind(null, ...rest)

export const reverse = a => [...a].reverse()

export const evaluate = ([f, ...a]) =>
  apply(f, map(a, x => isData(x) ? x : evaluate(x)))

export const fn = (obj, expr) => () => expr(obj) // TODO

export const λ = fn

export const add = (x, y) => x + y

export const assign = (target, source) => Object.assign(target, source)

export const assignDeep = (target, source) => reduce(entries(source),
  (t, [k, v]) => (t[k] = v, isObject(v) && assignDeep(t[k], v), t), target)

export const createElement = name => document.createElement(name)

export const createFragment = () => document.createDocumentFragment()

export const getElementById = id => document.getElementById(id)

export const querySelector = selector => document.querySelector(selector)

export const append = (parent, ...elements) =>
  (parent.append(...elements), parent)

export const parentElement = child => child.parentElement

export const replaceChildren = (parent, ...children) =>
  (parent.replaceChildren(...children), parent)

export const replaceWith = (element, ...nodes) =>
  element.replaceWith(...nodes)

export const replaceElement = (selector, ...nodes) =>
  replaceWith(querySelector(selector), ...nodes)

export const walk = (node = document.body, f = log, k = 'childNodes') =>
  f(node) && each(node[k], n => walk(n, f))

export const getElementsByProperties = o =>
  o.id ? [document.getElementById(o.id)]
    : o.className ? document.getElementsByClassName(o.className)
      : document.getElementsByTagName(o.tagName)

export const {main, div, p, button} = reduce(
  ['main', 'div', 'p', 'button'],
  (functions, tagName) =>
    ({...functions, [tagName]: (x, ...nodes) => create(tagName, x, ...nodes)}),
  {fragment: (...nodes) => append(createFragment(), ...nodes)})

let parent = null

export const create = (tagName, x, ...children) => {
  const element = createElement(tagName)
  const liveElements = [...getElementsByProperties({...x, tagName})]

  if(isObject(x) && !isElement(x))
    assignDeep(element, x).append(...children)
  else if(x)
    element.append(x, ...children)
  else element.append(...children)

  liveElements.forEach(el => {
    if(el) {
      if(!parent)
        parent = el.parentElement
      if(el === parent) {
        log('Replacing', el)
        replaceWith(el, element)
        parent = null
      }}})

  return element
}

