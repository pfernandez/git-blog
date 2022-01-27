
const counter = (count, id) =>
  div({ id },
    pre(
      { style: { fontSize: '4em',
                 margin: '20px 0' } },
      count),
    button(
      { onclick: () => counter(count + 1, id) },
      'Increment'))

export default counter

