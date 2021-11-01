import { evaluate, log, add } from './utils.js'

evaluate(
  [log,
    1,
    [add, 1, 1],
    [add,
      1,
      [add, 1, 1]]])
