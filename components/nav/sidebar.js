import folder from './folder.js'
import postLink from './post-link.js'

const listItem = ([key, value]) =>
  key === 'folders'
    ? value.length ? li(folder(value)) : ''
    : li(postLink(value))

const list = index =>
  map(entries(index), listItem)

export default index => ul(list(index))

