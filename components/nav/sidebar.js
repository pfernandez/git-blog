import post from '../post.js'
import sidebar from './sidebar.js'
import {update} from '../../lib/expressive/dom/elements.js'
import {setUrl} from '../../lib/expressive/dom/utils.js'

const renderPost = () => update(post())

// FIXME: Not rendering when the back button is clicked.
on('popstate', renderPost)

const fullPath = linkText =>
  location.pathname + linkText

const createLink = (linkText, path = fullPath(linkText)) =>
  a({onclick: () =>
    linkText.endsWith('/')  // the link was to a folder
      ? log('navigating and listing', path + 'index.js',
            setUrl(path, () => update(sidebar(path + 'index.js'))))

      : log('rendering', path,
            setUrl(path, renderPost))},
    linkText)

const linkText = fileName =>
  replace(fileName, '.md', '')

const parentDirectory = (path = location.pathname) =>
  path.endsWith('/')
    ? path.split('/').slice(-3)[0]
    : path.split('/').slice(-2)[0]

const list = (items, parent = parentDirectory()) =>
  ul(when(parent !== '/',
          li(a({onclick: () => setUrl(fullPath(parent), renderPost)},
               i({className: 'arrow left'}),
               parentDirectory()))),
     map(items, name =>
       li(createLink(linkText(name)))))

const updateList = ({default: items}) => update(list(items))

export default (index = '/index.js') =>
  (import(log('Fetching', index)).then(updateList), list([]))
