
const counter = (id, count) =>
  div({ id },
      pre(count),
      button({ onclick: () => counter(id, count + 1) },
             'Increment'))

export default counter

