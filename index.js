import './lib/expressive/global.js'
import index from './posts/index.js'
import post from './components/post.js'
import sidebar from './components/nav/sidebar.js'

html(
  head(
    title('git-blog'),
    meta({name: 'viewport', content: 'width=device-width, initial-scale=1'}),
    link({rel: 'icon', href: 'img/favicon.ico'}),
    link({rel: 'stylesheet', href: 'css/style.css'}),
    link({rel: 'stylesheet', href: 'lib/highlight/styles/github.min.css'})),
  body(
    header(
      hgroup(
        h1('git-blog'),
        h2('Github blogging for the masses'))),
    nav(sidebar(index)),
    main(post(location.pathname))))

