import post from '../post.js'
import sidebar from './sidebar.js'
import {setUrl} from '../../lib/expressive/dom/utils.js'

// FIXME: Not rendering when the back button is clicked.
on('popstate', post)

const fullPath = linkText =>
  location.pathname + linkText

const link = (linkText, path = fullPath(linkText)) =>
  a({id: replace(linkText, '/', ''), onclick: () =>
    linkText.endsWith('/')  // the link was to a folder
      ? log('navigating and listing', path + 'index.js',
            setUrl(path, () => sidebar(path + 'index.js')))

      : log('rendering', path,
            setUrl(path, post))},
    linkText)

const parentDirectory = (path = location.pathname) =>
  path.split('/').slice(path.endsWith('/') ? -3 : -2).join('/')

const list = (items, parent = parentDirectory()) =>
  ul(when(parent !== '/',
          li(a({id: 'first-link', onclick: () => setUrl(log(parent, '/' + parent))}, // post)},
               i({className: 'arrow left'}),
               parent))),
     map(items, name =>
       li(link(replace(name, '.md', '')))))

export default (index = '/index.js') =>
  (import(log('Fetching', index)).then(({default: items}) =>
    render(list(items))), list([]))
