import './lib/expressive/global.js'
import post from './components/post.js'
import posts from './posts.js'
// import sidebar from './components/nav/sidebar.js'

console.log(posts)

html(
  head(
    title('git-blog'),
    meta({name: 'viewport', content: 'width=device-width, initial-scale=1'}),
    link({rel: 'icon', href: '/img/favicon.ico'}),
    link({rel: 'stylesheet', href: '/css/style.css'}),
    link({rel: 'stylesheet', href: '/lib/highlight/styles/github.min.css'})),
  body(
    header(
      hgroup(
        h1(a({href: '/'}, 'git-blog')),
        h2('Github blogging for the masses'))),
    // nav(sidebar()),
    main(post())))

