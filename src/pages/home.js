import counter from '../components/counter.js'
import md from '../components/markdown.js'

export default () => section(
  md(`

  # Live Elements

  ## Just write the UI already

  JavaScript frameworks are needlessly complicated. There are a lot of reasons
  for this, but the biggest culprit is **state**. Some state (the text and
  and container elements that comprise this web page, for example) is desirable,
  but otherwise it's best to avoid state wherever possible. _Live Elements_ are
  designed to let you simply write what should appear on the screen.

  ## An Example

  The code that generates the page you're reading right now looks like this:

  \`\`\`js
  html(
    head(
      title('Expressive'),
      link({ rel: 'icon', href: 'img/favicon.ico' })
      link({ rel: 'stylesheet', href: 'style.css' })),
    body(
      header(
        h1('Expressive JS')),
      main(
        home())))
  \`\`\`

  ## Stateless Components

  The custom \`home\` element above is called a _component_, analagous to a
  React component. But instead of introducing the concept of
  [state change](https://reactjs.org/docs/state-and-lifecycle.html) to indicate
  that an element should be reloaded, we call it directly with new arguments.

  \`\`\`js
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
  \`\`\`

  Here it is in action:

  `),

  figure(
    h3('Recursive Counter'),
    counter('counter-1', 0)),

  md(`

  After loading the app with initial arguments, we might want to render it again
  with data fetched or computed asychronously. Let's replace the start count
  again, this time with an API response that returns \`{ count: 1 }\`.

  \`\`\`js
  fetch('/data')
    .then(response => response.json())
    .then(({ count }) => counter(count))
  \`\`\`

  The counter now begins at the value \`code('1')\` that was stored on the
  server.

  `),

  figure(
    h3('Recursive Counter'),
    counter('counter-2', 0)),

  (fetch('/data')
    .then(response => response.json())
    .then(({ count }) => counter('counter-2', count)), ''),

  md(`

  **So state really only needs to exist in three places:**

  1. In persistent storage such as a database server.
  2. In the state rendered on the screen.
  3. In the code itself as default function arguments. While not stricly
     necessary, these values are useful during fetch, for unit testing, and to
     enable static type checking in an otherwise dynamic system.

  Our app itelf remains effectively stateless, consisting of only pure
  functions.

  `))
