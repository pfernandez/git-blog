const push = (x, list) => list.push(x)

const reverse = list => [...list].reverse()

const map = (list, f) => list.map(f)

const isData = x => !list(x) && !func(x) && !lfunc(x)

const assoc = (x, a) = list(a)
  ? a.find(y => list(y) ? y[0] === x : undefined)
  : obj(x) ? a[x] : undefined


const λ = fn = (obj, expr) => () => expr(obj) // TODO 
