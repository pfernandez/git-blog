
The Expressive library comes with functions called "live elements" that will
immediately render the DOM when called.

## Example

The code that generates the page you're reading right now looks like this:

```js
html(
  head(
    title('Expressive'),
    link({ rel: 'icon', href: 'img/favicon.ico' })),
  body(
    { style:
      { background: '#222',
        color: '#eee', } },
    header(
      h1('Expressive JS')),
    main(
      home())))
```

## Stateless Components

The `home()` element above is a custom element called a _component_, analagous
to a React component. But instead of mutating state to reload an element like in
a React app, we call the component directly, with new arguments.

```live
const counter = (id, count) =>
  log(id, count, true) && div({ id },
    pre(
      { style:
        { fontSize: '4em',
          margin: '20px 0' } },
      count),
    button(
      { onclick: () => counter(id, count + 1) },
      'Increment'))
```

```result-1
figure(h3('Recursive Counter'), counter('counter-1', 0))
```

After loading the app with initial arguments, we might want to render it again
with data fetched or computed asychronously. Let's replace the start count
again, this time with an API response that returns `{ count: 1 }`.

```js
fetch('/data')
  .then(response => response.json())
  .then(({ count }) => counter(count))
```

The counter now begins at the value `1` that was stored on the server.

  figure(
    h3('Recursive Counter'),
    counter('counter-2', 0))

  (fetch('/data')
    .then(response => response.json())
    .then(({ count }) => counter('counter-2', count)), '')

**So state really only needs to exist in three places:**

1. In persistent storage such as a database server.
2. In the state rendered on the screen.
3. In the code itself as default function arguments. While not stricly
   necessary, these values are useful during fetch, for unit testing, and to
   enable static type checking in an otherwise dynamic system.

Our app itelf remains effectively stateless, consisting of only pure functions.
