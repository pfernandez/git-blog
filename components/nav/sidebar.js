import postLink from './post-link.js'

const linkText = name =>
  replace(name, '.md', '')

const list = items =>
  ul(map(items, name =>
    li(postLink(linkText(name)))))

export default (directory = urlParam('nav')) =>
  (import(log('fetching index', '/' + directory || '/') + 'index.js')
    .then(({default: items}) => update(list(items))),
  list([]))

