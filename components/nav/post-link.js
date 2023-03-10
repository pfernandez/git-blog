import post from '../post.js'
import sidebar from './sidebar.js'

const renderPost = () => update(post())

on('popstate', renderPost)

const basePath = (segments = location.pathname.split('/')) =>
  segments.slice(0, segments.length - 1).join('/')

const createLink = (text, path = basePath() + '/' + text) =>
  a({onclick: () =>
    text.endsWith('/')
      ? log('navigating and listing', path + 'index.js',
            navigate(path, () => update(sidebar(path + 'index.js'))))

      : log('rendering', path, navigate(path, renderPost))},
    text)

export default linkText => createLink(linkText)
