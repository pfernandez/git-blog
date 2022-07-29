import '/lib/expressive/global.js'
import posts from '/posts/index.js'
import post from '/components/post.js'
import sidebar from '/components/sidebar.js'

html(
  head(
    title('git-blog'),
    meta({name: 'viewport', content: 'width=device-width, initial-scale=1'}),
    link({rel: 'icon', href: 'img/favicon.ico'}),
    link({rel: 'stylesheet', href: 'style.css'}),
    link({rel: 'stylesheet', href: 'lib/highlight/styles/github.min.css'})),
  body(
    header(
      hgroup(
        h1('Expressive JS'),
        h2('An Experiment in Functional JavaScript'))),
    nav(sidebar(posts)),
    main(post(location.pathname))))
