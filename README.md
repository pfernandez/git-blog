# Expressive JS

A new project that (so far anyway), is split into two totally separate, complimentary parts:

* A toolkit for creating web interfaces. Let's call it _elements.js_.
* A suite of utility functions featuring a Lisp-style interpreter for JavaScript arrays. How about _functions.js_?

I may break these into separate libraries at some point, but for now they live together for convenience. They'll be "done" when I've proven to myself that they add something of value to the JavaScript landscape (and when I've built something substantial enough with them to prove production-readiness).

**This is a brain dump, not a library**. Please read it not as some kind of manifesto of assertions, but as an evolving group of ideas still in the process of formation. For the most part the code does work as described, but it's constantly evolving too.

## Motivation

To discover a simpler, more _expressive_ way to code for the web.

> **expressive**
>
>   _adjective_
>
>  1. Effectively conveying thought or feeling.
>  2. Conveying (a specified quality or idea).

Programming is a process of making ideas a reality, and uncovering new ideas along the way. This project itself is the expression of such a process. In fact, all symbolic logic, whether in a math textbook or a computer program, is composed of expressions.

### Beauty Through Simplicity

The qualites I'm looking for, then, are features that allow and encourage the _composition_ of web applications from only the simple components that they _must_ be made from. And nothing more.

The syntax should be

* Concise, with as few parts as possible while maintaining readability.
* Easy to understand. A new user should be able to pick it up quickly.
* Clean and visually pleasing. Beauty is not subjective; we can all see the
  difference between a tidy desk and a cluttered one.
* Powerful. It should have at least the capabilities of the base language, and
  should express the same logic with fewer concepts.

Lisp (or more directly, lambda calculus) points the way to simpler code because it was created from the fundamental axioms of logic upon which computing is based.

### The Maze of JavaScript Frameworks

Modern JavaScript frameworks, while giving us a structured way to build web applications, are full of complexity. They're hard for new users to learn, and often become difficult for even experienced developers to reason about. Much of this complexity comes from a reliance on state mutation, often mixed with additional concepts that must be understood and used correctly.

There's also a second-order effect at play, where core decisions about how a framework will be used leads to a proliferation of "features" that would probably have been unnecessary had simpler choices been made in the initial design of the framework. Complexity leads to even more complexity.

# Elements.js

The idea is to compose the UI with _function elements_ that emit HTML, creating a structure that immediately generates the real DOM. Running the code below will render a web page.

## Hello World
```js
import './expressive/global.js'

html(
  doctype('html'),
  head(
    title('Expressive'),
    link({ rel: 'icon', href: 'img/favicon.ico' })),
  body(
    { style:
      { background: '#222',
        color: '#eee',
        textAlign: 'center' } },
    main(
      h1('Hello World'))))
```

### Modular CSS

There's no reason we shouldn't use the CSS modules approach here, and we can certainly use the CSS Modules library if desired. But why not simply move our styles into a normal JavaScript object in a separate file?

```js
import { bodyStyles } from './style.js'

body({ style: bodyStyles }, main(h1('Hello World'))
```

(We might want unique strings appended to CSS class names, but a basic function should take care of it. Maybe call it `uniquify`?)

## Stateless Components

**State really only _must_ exist in two places, neither of which is our component:**

1. In persistent storage such as a database server.
2. In the state rendered on the screen.

The code itself also may carry "state" as default function arguments or in separate fixtures. While not stricly necessary, these values can be useful while waiting for results from an API, for unit testing, and to enable static type checking in an otherwise dynamic system. We'll explore this idea more later.

### A Simple Recursive Counter

Any function that returns an element is itself an element, allowing us to create components analagous to those in React.js. But instead of mutating state to reload an element as in a React app, we simply call the component directly, with new arguments.

If a function element is called while it already exists on the page, any changes to its input arguments (or those of its child elements) will cause a corresponding update on the screen.

```js
import { body, div, pre, button } from './expressive/elements.js'

const counter = (count = 0) =>
  div(
    pre(count),
    button(
      { onclick: () => counter(count + 1) },
      'Increment'))

body(counter())
```

A function element can take any number of children, and accepts an optional object of [DOM properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#properties) as a first argument.

### Selecting DOM Elements

While we can compare function elements to React components, they also have a similarity to jQuery selectors.

The counter example above, if included in a larger web page, would have updated every `<div>` on the page. To target a specific element or group of elements, pass it an ID or class name.

```js
const counter = (id = 'counter-1', count = 0) =>
  div({ id },
    pre(count),
    button(
      { onclick: () => counter({ id }, count + 1) },
      'Increment'))

body(counter())
```

### Web Components

Another option is to use the `element` function (which elements.js uses internally to generate the default elements) to generate a web component. With this approach, an actual `<counter />` element will be inserted into the DOM. An advantage to doing it this way is that the element name itself acts as a unique `tagName` selector.

```js
import { element } from './expressive/elements.js'

const counter = (count = 0) =>
  element('counter',
    div(
      pre(count),
      button(
        { onclick: () => counter(count + 1) },
        'Increment')))
```

### API Data

After loading the app with initial arguments, we might want to render it again with data fetched or computed asychronously. Let's replace the start count again, this time with an API response that returns `{ count: 1 }`.

```js
fetch('/data')
  .then(response => response.json())
  .then(({ count }) => counter(count))
```

Our counter now begins at `1` instead of `0`.

Notice that the functional purity of our component is preserved because we've limited the side effect to a thin external function-- devoid of internal logic-- that _passes data into_ the component as an argument.

# Functions.js

This project began as an exploration of Lisp, lambda calculus, and functional programming. I wondered if it might be possible to implement a list processor using arrays, in order to gain the benefits of a Lisp syntax while being able to levarage all of the libraries we know and love because _it's just JavaScript_.

## `evaluate(array)`

The `evaluate` function works much like the core Lisp function `eval`, which recursively evaluates a tree of nested lists.

Given the functions `log(x)` and `sum(x, y)`,

```js
import { evaluate, log, sum } from './expressive/functions.js'

evaluate(
  [log,
    1,
    [sum, 1, 1],
    [sum,
      1,
      [sum, 1, 1]]])
```

will log `1 2 3` to the console.

* If first element in the array is a function, the array is a _function
expression_. The remaining elements will be passsed to it as arguments.
* Any arguments that themselves are function expressions will be evaluated
first, and so on down the tree.
* Arrays without a leading function are treated as data and returned
unaffected. Any function expressions they contain will _not_ be evaluated.

### Data as Code

Let's use our function elements as we did before, but this time refrain from immediately evaluating the code.

```js
const app =
  [html,
    [doctype, 'html'],
    [head,
      [title, 'Expressive'],
      [link, { rel: 'icon', href: 'img/favicon.ico' }]],
    [body,
      { style:
        { background: '#222',
          color: '#eee',
          textAlign: 'center' } },
      [main,
        [h1, 'Recursive counter'],
        [counter, 0]]]]
```

Now, because the app code is represented as data, we can update the inital app "state" between render cycles by creating a copy of the app with updated function arguments, then changing the start count from `0` to `2`.

```js
const app2 = deepMap(app, node => node === 0 ? 2 : node)

evaluate(app2)
```

And now the counter begins at `2`. See the **Why Bother...** section below for a bit more on this topic and its relationship to Lisp macros.

# Utilities

I found myself adding utility functions to facilitate function composition (as opposed to sequential, procedural statements), to avoid mutation when it isn't really necessary, and to remove the visual noise of dot-property accessors. For example, `console.log(a, b, ...)` is exported as `log(a, b, ...)`. The final argument is returned, allowing us to transparently wrap a function while logging to the console. `reverse()` is implemented as `[...array].reverse()`, producing a new array rather than modifying the original array in place. `Object.keys(object)` becomes `keys(object)`, `array.map(fn)` becomes `map(array, fn)`, and so on.

## A Simpler, More Readable Syntax

Take the definition of `deepMap`. With plain ES6, the most concise, purely functional way I could come up with to write it was

```js
export const deepMap = (value, fn) =>
  Array.isArray(value)
    ? value.map(v => deepMap(v, fn))
    : typeof value === 'object' && value !== null
      ? Object.entries(object).reduce((o, [k, v]) => ({ ...o, [k]: fn(v) }), {})
      : fn(value)
```

Not terrible, but the underlying object-oriented implementation of JavaScript clutters it with unnecessary information. Why do we need to express that `entries` is a property of the `Object` prototype? Why are we checking for `null`? And that `reduce` is just a hard-to-read way of creating one object from another. _functions.js_ cleans it up.

```js
export const deepMap = (value, fn) =>
  isArray(value) ? map(value, v => deepMap(v, fn))
    : isObject(value) ? omap(value, v => deepMap(v, fn))
      : fn(value)
```

## Functions Provided

The list of functions is, of course, evolving, but at the time of this writing the signatures are

* `and(x, y)`
* `append(value, array)`
* `apply(fn, array)`
* `bool(value)`
* `deepMap(value, fn)`
* `each(array, fn)`
* `entries(object)`
* `eq(x, y)`
* `evaluate(array)`
* `every(...values)`
* `exists(value)`
* `filter(array, fn)`
* `find(array, fn)`
* `first(array)`
* `globalize(object)`
* `identity(value)`
* `ifElse(value, then, otherwise)`
* `isArray(value)`
* `isEmpty(value)`
* `isFunction(value)`
* `isInstance(value, type)`
* `isObject(value)`
* `join(array, separator)`
* `keys(object)`
* `lastarray`
* `length(array)`
* `log(...values)`
* `map(array, fn)`
* `not(value)`
* `omap(object, fn)`
* `omit(object, key)`
* `or(x, y)`
* `partial(fn, ...values)`
* `reduce(array, fn, value)`
* `rest(array)`
* `reverse(array)`
* `slice(array, start, end)`
* `some(array, fn)`
* `split(array, separator, limit)`
* `sum(...values)`
* `type(value, type)`
* `walk(root, f)`

**Why bother creating functions like `and()`, `not()`, and `ifElse()`?**

Some might feel that a syntax composed of nothing but functions is beautiful in its simplicity, even if it is a bit more verbose. But perhaps more importantly...

### Deferred Evaluation

Consider the **Data as Code** section above. If you want to include (say) a conditional expression, we'd normally write it like so:

```js
const twoOrThree = [sum, 1, x ? 1 : 2]
```

Now imagine we wanted to change the value `2` to `3`. If `x` is `true`, we'd be unable to do so because the expression `x ? 1 : 2` will immediately evaluate to `1`. But if we write

```js
const twoOrThree = [sum, 1, [ifElse, x, 1, 2]]
```

we _can_ change `2` to `3` because we've converted the conditional expression to a function expression, which is really just an array of data.

It may or may not be possible to realize the full power of Lisp macros while limiting ourselves to native JavaScript. But it's instructive to see how far we can get. Is escaping and unescaping code really the only way to write a macro? What are the limits of treating code as data by decomposing it into small functions instead? Could a self-improving machine learning algorithm be written this way?
