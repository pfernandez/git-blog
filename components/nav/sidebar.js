import postLink from './post-link.js'

const linkText = name =>
  replace(name, '.md', '')

const list = (path, items) =>
  ul(map(items, name =>
    li(postLink(path, linkText(name)))))

// TODO: Dedupe with post-link.js. Also too many calls to location.pathname.
const isFolder = (path = location.pathname) =>
  path.length > 1 && path.endsWith('/')

export default () =>
  (import((isFolder() ? location.pathname : '/') + 'index.js')
    .then(({default: items}) =>
      update(list(location.pathname, items))),
  list(location.pathnae, []))

