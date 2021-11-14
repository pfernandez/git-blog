import * as utils from './utils.js'
import * as component from './component.js'
utils.each(
  [...utils.entries(utils), ...utils.entries(component)],
  ([k, v]) => window[k] = v)


// evaluate(
//  [log,
//    1,
//    [add, 1, 1],
//    [add,
//      1,
//      [add, 1, 1]]])
