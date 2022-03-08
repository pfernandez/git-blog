import counter from '../components/counter.js'
import md from '../components/markdown.js'

export default () => section(
  md(`

  # Live Elements

  ## Just write the UI already

  JavaScript frameworks are needlessly complex. There are a lot of reasons for
  this, but the biggest culprit is **state**. Some state, such as the text and
  and container elements that comprise the "state" of this web page, is
  desirable, but otherwise it's best to avoid it wherever possible. _Live
  Elements_ are designed to let you simply write what should
  appear on the screen.

  ## Simply Declarative

  Live Elements provide a functional, elegant way to express the DOM that maps
  directly to HTML without introducing any additional concepts.

  \`\`\`js
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
  \`\`\`

  ## Stateless Components

  We can create custom elements called _components_, analagous to React
  components. But instead of introducing the concept of
  [component state](https://reactjs.org/docs/state-and-lifecycle.html) to
  indicate that an element should be reloaded, we call it directly with new
  arguments.

  \`\`\`js
  const counter = count =>
    div(pre(count),
        button({ onclick: () => counter(count + 1) },
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

  The counter now begins at the value \`1\` that was stored on the
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

  1. In the state rendered on the screen at any given moment.
  2. In persistent storage such as a database server.
  3. In the code itself as default function arguments. While not stricly
     necessary, these initial values are useful to provide default values while
     waiting for asynchronously fetched data, for unit testing, and to infer
     function input types when used with a type checker such as
     [tsserver](https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29).

  Our app itelf remains effectively stateless, consisting of only pure
  functions.

  `))
