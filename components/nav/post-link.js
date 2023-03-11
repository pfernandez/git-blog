import post from '../post.js'
import sidebar from './sidebar.js'
import {update} from '../../lib/expressive/dom/elements.js'
import {setUrl} from '../../lib/expressive/dom/utils.js'

const renderPost = () => update(post())

on('popstate', renderPost)

const basePath = (segments = location.pathname.split('/')) =>
  segments.slice(0, segments.length - 1).join('/')

// TODO: Append/remove URL segments as the folders are navigated with the
// sidebar links. Add a link (with back icon) to the parent directory.
//
// * The rendered post should update with sidebar navigation.
// * The URL should always reflect the actual path to the markdown file in the
//   project.
const createLink = (linkText, path = basePath() + '/' + linkText) =>
  a({onclick: () =>
    linkText.endsWith('/')  // the link was to a folder
      ? log('navigating and listing', path + 'index.js',
            setUrl(path, () => update(sidebar(path + 'index.js'))))

      : log('rendering', path,
            setUrl(path, renderPost))},
    linkText)

export default linkText => createLink(linkText)
