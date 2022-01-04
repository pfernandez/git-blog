// TODO: Without an ID assigned to every element, every div, pre, and button on
// the page will be rerendered with the arguments passed in here as soon as
// counter is called. Options:
//
// 1. Always transparently assign the outermost ID to the child elements.
// 2. Always `data-id` everything.
// 3. Include the element heirarchy in the selector when creating custom
//    elements. Needs more thought.
// 4. ...
const counter = (count, id) =>
  div({ id },
    pre(
      { id,
        style:
        { fontSize: '4em',
          margin: '20px 0' } },
      count),
    button(
      { id,
        onclick: () => counter(count + 1, id) },
      'Increment'))

export default counter
