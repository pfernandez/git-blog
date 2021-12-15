import './expressive/global.js'

const counter = (count = 0) =>
  div(
    pre(
      { style:
        { fontSize: '4em',
          margin: '20px 0' } },
      count),
    button(
      { onclick: () => counter(count + 1) },
      'Increment'))

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
      counter())))

evaluate(
  [log,
    1,
    [sum, 1, 1],
    [sum,
      1,
      [sum, 1, 1]]])
