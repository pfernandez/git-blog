import folder from './folder.js'
import postLink from './post-link.js'

const listItem = entry =>
  li(first(entry) === 'folders' ? folder(second(entry)) : postLink(entry))

const list = index =>
  map(entries(index), listItem)

export default index => ul(list(index))

