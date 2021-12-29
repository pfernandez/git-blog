import './expressive/global.js'

/**
 * The Expressive library comes with functions called "live elements" that will
 * immediately render the DOM when called. A custtom elements can be composed
 * from these functions, analagous to a React "component": Any function that
 * returns a live element is itself a live element.
 *
 * But instead of mutating state to reload an element as in a React app, we can
 * simply call the component _directly_ with new arguments.
 */
const counter = count =>
  div(
    pre(
      { style:
        { fontSize: '4em',
          margin: '20px 0' } },
      count),
    button(
      { onclick: () => counter(count + 1) },
      'Increment'))

/**
 * The full single-page app might look like this...
 */
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
      h1('Recursive counter'),
      counter(0))))

/**
 * After loading the app with initial arguments, we might want to render it
 * again with data fetched or computed asychronously. Let's replace the start
 * count again, this time with an API response that returns `{ count: 1 }`.
 */
fetch('/data')
  .then(response => response.json())
  .then(({ count }) => counter(count))

/**
 * The counter now begins at the value `1` that was stored on the server.
 *
 * So state only needs to exist in three places:
 *
 *   1. In persistent storage such as a database server.
 *
 *   2. In the state rendered on the screen.
 *
 *   3. In the code itself as default function arguments. While not stricly
 *      necessary, these values are useful during fetch, for unit testing, and
 *      to enable static type checking in an otherwise dynamic system.
 *
 * Our app itelf remains effectively stateless, consisting of only pure
 * functions.
 */
