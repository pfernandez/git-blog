import { evaluate, log, add } from './utils.js'
import { counter } from './component.js'

evaluate(
  [log,
   1,
   [add, 1, 1],
   [add,
    1,
    [add, 1, 1]]])

counter()

