const apply = (f, args, scope) => Reflect.apply(f, scope, args)

const fn = (f, args) => apply(f, args)

const evaluate = ([f, ...args]) => fn(f, args)

const expression = [console.log, 'Hello world', 1+1, []]

evaluate(expression)
