# Expressive JS

A new project that (so far anyway), is split into two totally separate, yet
complimentary parts:

* A toolkit for creating web interfaces. Let's call it _elements.js_.
* A Lisp interpreter for JavaScript. How about _jLisp_?

I may break these into separate libraries at some point, but for now they live together for convenience.

### The Goal

To discover the most _expressive_ way to code for the web.

> expressive
>
>   _adjective_
>
>  1. Effectively conveying thought or feeling.
>  2. Conveying (a specified quality or idea).

Programming is a process of making ideas a reality, and uncovering new ideas along the way. This project itself is the expression of such a process. In fact, all symbolic logic, whether in a math textbook or a computer program, is composed of expressions.

The qualites I'm looking for here, then, are features that allow and encourage writing code that is

* Concise, with as few parts as possible while maintaining readability.
* Easy to understand. A new user should be able to pick it up quickly.
* Clean and visually pleasing. Beauty is not subjective; we can all see the difference between a tidy desk and a cluttered one.
* Powerful. It should have all the capabilities of the base language, and hopefully more.

## elements.js

The idea is to compose the UI with _function elements_ that emit HTML, creating a structure that mirrors the real DOM. Running the code below will render a web page.

### Hello World
```js
import './elements/global.js'

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

If a function element is called while it already exists on the page, it will be rerendered.

### A Simple Counter
```js
import { body, div, pre, button } from './elements.js'

const counter = (count = 0) =>
  div(
    pre(count),
    button(
      { onclick: () => counter(count + 1) },
      'Increment'))

body(counter())
```

A function element can take any number of children, and accepts an optional object of [DOM properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#properties) as a first argument.

The counter example above, if included in a larger web page, would have updated every `<div>` on the page. To target a specific element or group of elements, pass it an ID or class name:

```js
const counter = (id = 'counter-1', count = 0) =>
  div({ id }
    pre(count),
    button(
      { onclick: () => counter({ id }, count + 1) },
      'Increment'))

body(counter())

```

## jLisp

_jLisp_ is about writng JavaScript in a Lisp syntax while still being able to levarage all of the libraries we know and love, _still writing plain JS_. This is made possible with the `evaluate` function, which recursively evaluates an expression.

Given a function `add(x, y)`,

```js
import { evaluate } from '/.jLisp.js'

evaluate(
  [console.log,
    1,
    [add, 1, 1],
    [add,
      1,
      [add, 1, 1]]])
```

will log `1 2 3` to the console.

* If first element in the array is a function, the array is a _function
expression_. The remaining elements will be passsed to it as arguments.
* Any arguments that themselves are function expressions will be evaluated
first, and so on down the tree.
* Arrays without a leading function are treated as data and returned
unaffected. Any function expressions they contain will _not_ be evaluated.

