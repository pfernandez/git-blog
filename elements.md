# Live Elements

## Just write the UI already

JavaScript frameworks are needlessly complex. There are a lot of reasons for
this, but the biggest culprit is **state**. Some state (such as the text and
container elements that comprise the "state" of this web page) is necessary, but
otherwise it's best to avoid it wherever possible. _Live Elements_ are designed
to let you simply write what should appear on the screen.

## Simply Declarative

Live Elements provide an elegant, functional way to express the DOM that maps
directly to HTML without introducing any additional concepts.

```js
import 'expressive/elements.js'

const siteName = 'My Website'

html(
  head(
    title(siteName),
    link({ rel: 'icon', href: 'favicon.png' })
    link({ rel: 'stylesheet', href: 'style.css' })),
  body(
    header(
      h1({ className: 'site-name' }, siteName)),
    main(
      p('Hello world!'))))
```

## Stateless Components

We can also create custom elements, analagous to React components. But instead
of introducing the concept of [component
state](https://reactjs.org/docs/state-and-lifecycle.html) to indicate that an
element should be updated, we simply call it with new arguments.

```live-js
const counter = (id, count) =>
  div({ id },
      pre(count),
      button({ onclick: () => update(counter(id, count + 1)) },
             'Increment'))
```

This produces:

<script>
  document.currentScript.after(
    figure(h3('A Simple Counter'), counter('c1', 0)))
</script>

So: On the client, state really only needs to exist in one place: **The DOM**.
Our app itelf remains effectively stateless, consisting of only pure functions.
