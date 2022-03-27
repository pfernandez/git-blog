import * as functions from './functions.js'
import * as elements from './dom/elements.js'
import * as utils from './dom/utils.js'

functions.globalize({ ...functions, ...elements, ...utils })
