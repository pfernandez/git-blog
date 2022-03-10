import post from './post.js'

addEventListener('popstate', () => main(post(location.pathname)))

const navLink = (text, pathname) =>
  button({ onclick:
           () => (main(post(pathname)), history.pushState({}, '', pathname)) },
         text)

const navigation = () =>
  nav(ul(li(navLink('Home', '/')),
         li(navLink('Live Elements', '/elements'))))

export default navigation
