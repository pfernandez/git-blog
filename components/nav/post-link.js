import post from '../post.js'
import sidebar from './sidebar.js'
import {update} from '../../lib/expressive/dom/elements.js'
import {setUrl} from '../../lib/expressive/dom/utils.js'

const renderPost = () => update(post())

// FIXME: Not rendering when the back button is clicked.
on('popstate', renderPost)

// TODO: 
// * Add a sidebar link (with back icon) to the parent directory.
// * The URL should always reflect the actual path to the markdown file in the
//   project.
const createLink = (linkText, path = location.pathname + linkText) =>
  a({onclick: () =>
    linkText.endsWith('/')  // the link was to a folder
      ? log('navigating and listing', path + 'index.js',
            setUrl(path, () => update(sidebar(path + 'index.js'))))

      : log('rendering', path,
            setUrl(path, renderPost))},
    linkText)

export default linkText => createLink(linkText)
