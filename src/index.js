import * as utils from './utils.js'
import * as component from './component.js'
utils.each(
  [...utils.entries(utils), ...utils.entries(component)],
  ([k, v]) => window[k] = v)
const {log} = utils

log(JSON.stringify(tree, null, 2))

// evaluate(
//  [log,
//    1,
//    [add, 1, 1],
//    [add,
//      1,
//      [add, 1, 1]]])
