import counter from '../components/counter.js'

const figureStyle = {
  border: '1px solid #444',
  display: 'inline-block',
  margin: 'auto 0',
  padding: '0 20px 20px',
  textAlign: 'center',
}

export default () => article(
  { style: { maxWidth: '800px',
             margin: '0 auto' } },

  p(`The Expressive library comes with functions called "live elements" that
     will immediately render the DOM when called.`),

  h2('Example'),

  p(`The code that generates the page you're reading right now looks like
     this:`),

  pre(`html(
  doctype('html'),
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
      home())))`),

  h2('Stateless Components'),

  p('The ', code('home()'), ' element above is a custom element called a ', em(`
     component`), `, analagous to a React component: Any function that returns a
     live element is itself a live element. But instead of mutating state to
     reload an element as in a React app, we simply call the component directly,
     with new arguments.`),

  pre(`const counter = count =>
  div(
    pre(
      { style:
        { fontSize: '4em',
          margin: '20px 0' } },
      count),
    button(
      { onclick: () => counter(count + 1) },
      'Increment'))`),

  figure(
    { style: figureStyle },
    h3('Recursive Counter'),
    counter(0, 'counter-0')),

  p(`After loading the app with initial arguments, we might want to render it
     again with data fetched or computed asychronously. Let's replace the start
     count again, this time with an API response that returns `, code(
    '{ count: 1 }'), '.'),

  pre(`fetch('/data')
  .then(response => response.json())
  .then(({ count }) => counter(count))`),

  p('The counter now begins at the value ', code('1'), ` that was stored on the
     server.`),

  figure(
    { style: figureStyle },
    h3('Recursive Counter'),
    counter(0, 'counter-1')),

  (fetch('/data')
    .then(response => response.json())
    .then(({ count }) => counter(count, 'counter-1')), ''),

  p('So state really only needs to exist in three places:',
    ol(
      li('In persistent storage such as a database server.'),
      li('In the state rendered on the screen.'),
      li(`In the code itself as default function arguments. While not stricly
          necessary, these values are useful during fetch, for unit testing, and
          to enable static type checking in an otherwise dynamic system.`)),
    `Our app itelf remains effectively stateless, consisting of only pure
     functions.`))

