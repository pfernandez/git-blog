import './expressive/global.js'

/* The Expressive library comes with functions called "live elements" that will
   immediately render the DOM when called. A "component" can be composed from
   these functions, which React users will find familar.

   But instead of mutating state to reload a component, we can call the
   component directly with new arguments, even using recursion if desired. */

window.counter = count =>
  div(
    pre(
      { style:
        { fontSize: '4em',
          margin: '20px 0' } },
      count),
    button(
      { onclick: () => counter(count + 1) },
      'Increment'))

/* The full single-page app might look like this...

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

   ...which almost looks like Lisp, doesn't it?

   The `evaluate` function lets us go all the way. First we'll store the app in
   a variable (although it would typically be exported from a dedicated file).
*/

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

/* Now, because the app code is represented as data, we can update app "state"
   by creating a copy of the app with updated function arguments, changing the
   start count from 0 to 42. */

const app2 = deepMap(app, node => node === 0 ? 42 : node)

/* Let's run it. */

evaluate(app2)

/* The counter now begins at 42. There's no reason that the entire application
   state can't be updated in this way, when (say) a new value is received from a
   database server.

   So state only needs to exist in three places:

     1. In a database for persistent storage.

     2. In the code itself as function arguments. We can visualize each
        change to these values as a step forward in time. Initializing the
        values as we've done here isn't stricly necessary, but is useful for
        unit testing and to enable static type checking in an otherwise dynamic
        system.

     3. In the state rendered on the screen.

   Our app itelf is effectively stateless, consisting of only pure functions. */

