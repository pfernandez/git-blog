# Expressive JS

A new project that (so far anyway), is split into two totally separate, yet
complimentary parts:

* A toolkit for creating web interfaces. Let's call it _elements.js_.
* A Lisp-style interpreter for JavaScript. How about _lisp.js_?

I'll probably break these into separate libraries at some point, but for now they live together for convenience. They'll be "done" when I've proven to myself that they really could handle a production scenario.

Please read this not as some kind of manifesto full of concrete assertions, but as an evolving group of ideas still in the process of formation. For the most part the code does work as described, but it's constantly evolving too.

### Motivation

To discover a simpler, more _expressive_ way to code for the web.

> **expressive**
>
>   _adjective_
>
>  1. Effectively conveying thought or feeling.
>  2. Conveying (a specified quality or idea).

Programming is a process of making ideas a reality, and uncovering new ideas along the way. This project itself is the expression of such a process. In fact, all symbolic logic, whether in a math textbook or a computer program, is composed of expressions.

#### Beauty Through Simplicity

The qualites I'm looking for here, then, are features that allow and encourage the _composition_ of web applications from only the simple components that they _must_ be made from. And nothing more.

The syntax should be

* Concise, with as few parts as possible while maintaining readability.
* Easy to understand. A new user should be able to pick it up quickly.
* Clean and visually pleasing. Beauty is not subjective; we can all see the
  difference between a tidy desk and a cluttered one.
* Powerful. It should have at least the capabilities of the base language, and
  should express the same logic in fewer symbols.

Lisp (or more directly, lambda calculus) points the way to simpler code because it was created from the fundamental axioms of logic upon which computing is based.

#### The Maze of JavaScript Frameworks

Modern JavaScript frameworks, while giving us a structured way to build web applications, are full of complexity. They're hard for new users to learn, and often become difficult for even experienced developers to reason about. Much of this complexity comes from a reliance on state mutation, often mixed with additional concepts that must be understood and used correctly.

There's also a second-order effect at play, where core decisions about how a framework will be used leads to a proliferation of "features" that would probably have been unnecessary had simpler choices been made in the initial design of the framework. Complexity leads to even more complexity.

## Elements.js

The idea is to compose the UI with _function elements_ that emit HTML, creating a structure that immediately generates the real DOM. Running the code below will render a web page.

### Hello World
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

#### Modular CSS

There's no reason we shouldn't use the CSS modules approach here, and we can certainly use the CSS Modules library if desired. But why not simply move our styles into a normal JavaScript object in a separate file?

```js
import { bodyStyles } from './style.js'

body({ style: bodyStyles }, main(h1('Hello World'))
```

(We might want unique strings appended to CSS class names, but a basic function should take care of it. Maybe call it `uniquify`?)

### Stateless Components

**State really only _must_ exist in two places, neither of which is our component:**

1. In persistent storage such as a database server.
2. In the state rendered on the screen.

The code itself also may carry "state" as default function arguments or in separate fixtures. While not stricly necessary, these values can be useful while waiting for results from an API, for unit testing, and to enable static type checking in an otherwise dynamic system. We'll explore this idea more later.

#### A Simple Recursive Counter

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

#### Selecting DOM Elements

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

#### Web Components

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

#### API Data

After loading the app with initial arguments, we might want to render it again with data fetched or computed asychronously. Let's replace the start count again, this time with an API response that returns `{ count: 1 }`.

```js
fetch('/data')
  .then(response => response.json())
  .then(({ count }) => counter(count))
```

Our counter now begins at `1` instead of `0`.

Notice that the functional purity of our component is preserved because we've limited the side effect to a thin external function-- devoid of internal logic-- that _passes data into_ the component as an argument.

## Lisp.js

This project was originally started as an exploration of Lisp, lambda calculus, and functional programming. I wondered if it might be possible to implement a list processor using arrays, in order to gain the benefits of a Lisp syntax while being able to levarage all of the libraries we know and love because it's _just JavaScript_.

I've included helper functions to achieve a more concise, functional syntax and to ensure that a value is always returned (which is important to prevent the need to fall back to writing separate procedures line-by-line).

For example, `console.log(a, b, ...)` is exported as `log(a, b, ...)`, and the final argument is returned, allowing us to transparently wrap a function while logging to the console. `array.map(fn)` becomes `map(array, fn)` and so forth.

### `evaluate(list)`

The `evaluate` function works much like the core Lisp function `eval`, which recursively evaluates an expression.

Given a function `add(x, y)`,

```js
import { evaluate, log, sum } from '/.lisp.js'

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

#### Data as Code

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

Now, because the app code is represented as data, we can update the inital app "state" between render cycles by creating a copy of the app with updated function arguments, then changing the start count from 0 to 2.

```js
const app2 = deepMap(app, node => node === 0 ? 2 : node)

evaluate(app2)
```

And now the counter begins at 2.

It's not hard to imagine other uses for this technique, including self-improving machine learning algorithms. I suspect that we should be able to achieve the full power of Lisp macros this way, but that's another area to be explored.
