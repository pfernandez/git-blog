import postLink from './post-link.js'

const linkText = fileName =>
  replace(fileName, '.md', '')

const list = items =>
  ul(map(items, name =>
    li(postLink(linkText(name)))))

const updateList = ({default: items}) => update(list(items))

export default (index = '/index.js') =>
  (import(log('Fetching', index)).then(updateList), list([]))
