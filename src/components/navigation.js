import post from './post.js'

// TODO? Separate DOM utils library
const navigate = pathname => history.pushState({}, '', pathname)
const on = addEventListener

on('popstate', () => main(post(location.pathname)))

// TODO? Put the navigation in `post`
const renderPost = () => (main(post(pathname)), navigate(pathname))

const navLink = (text, pathname) =>
  button({ onclick: () => renderPost(pathname) }, text)

const navigation = () =>
  nav(ul(li(navLink('Home', '/')),
         li(navLink('Live Elements', '/elements'))))

export default navigation
