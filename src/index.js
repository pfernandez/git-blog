import './lib/expressive/global.js'
import home from './pages/home.js'
import navLink from './components/nav-link.js'

html(
  head(
    title('Expressive'),
    meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
    link({ rel: 'icon', href: 'img/favicon.ico' }),
    link({ rel: 'stylesheet', href: 'style.css' }),
    link({ rel: 'stylesheet', href: 'lib/highlight/styles/github.min.css' })),
  body(
    header(
      hgroup(
        h1('Expressive JS'),
        h2('An Experiment in Functional JavaScript'))),
    main(home()),
    // nav(ul(li(navLink('Live Elements', '/live-elements'))))
  ))

