import elements from '../elements.js'

Object.entries(elements).forEach(
  ([k, v]) => window ? window[k] = v : global[k] = v)
