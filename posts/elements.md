# Live Elements

## Just write the UI already

JavaScript frameworks are needlessly complex. There are a lot of reasons for
this, but the biggest culprit is **state**. Some state, such as the text and
container elements that comprise the "state" of this web page, is desirable, but
otherwise it's best to avoid it wherever possible. _Live Elements_ are designed
to let you simply write what should appear on the screen.

## Simply Declarative

Live Elements provide a functional, elegant way to express the DOM that maps
directly to HTML without introducing any additional concepts.

```js
import 'expressive/elements.js'

html(
  head(
    title('A Basic Web Page'),
    link({ rel: 'icon', href: 'favicon.png' })
    link({ rel: 'stylesheet', href: 'style.css' })),
  body(
    header(
      h1('Welcome to My Website')),
    main(
      p('Hello world!'))))
```

## Stateless Components

We can create custom elements called _components_, analagous to React
components. But instead of introducing the concept of [component
state](https://reactjs.org/docs/state-and-lifecycle.html) to indicate that an
element should be reloaded, we update it directly with new arguments.

```live-js
const counter = (id, count) =>
  div({ id },
      pre(count),
      button({ onclick: () => update(counter(id, count + 1)) },
             'Increment'))
```

Here it is in action:

<script>
  document.currentScript.after(
    figure(h3('A Simple Counter'), counter('c1', 0)))
</script>

**So: On the client, state really only needs to exist in three places:**

1. In the state rendered on the screen at any given moment.
2. In the code itself as default function arguments. While not stricly
   necessary, these initial values are useful to provide default values while
   waiting for asynchronously fetched data, for unit testing, and to infer
   function input types when used with a type checker such as
   [tsserver](https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29).

Our app itelf remains effectively stateless, consisting of only pure functions.

