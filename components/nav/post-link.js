import post from '../post.js'
import sidebar from './sidebar.js'

const renderPost = () => update(post())

on('popstate', renderPost)

const basePath = segments =>
  '/' + segments.slice(0, segments.length - 1).join('/')

// TODO: Currently this only works one level deep.
const index = (linkText, pathname = location.pathname) =>
  basePath(pathname.split('/')) + linkText + 'index.js'

const createLink = (text, isDirectory = text.endsWith('/')) =>
  a({onclick: () =>
    isDirectory
      ? log('listing', index(text), update(sidebar(index(text))))
      : log('rendering', text, navigate(text, renderPost))},
    text)

export default linkText => createLink(linkText)
