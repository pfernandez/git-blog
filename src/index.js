import './lib/expressive/global.js'
import content from './components/content.js'

html(
  head(
    title('git-blog'),
    meta({charset: 'utf-8'}),
    meta({name: 'viewport', content: 'width=device-width, initial-scale=1'}),
    link({rel: 'icon', href: 'img/favicon.ico'}),
    link({rel: 'stylesheet', href: '/style.css'}),
    link({rel: 'stylesheet', href: 'lib/highlight/styles/github.min.css'})),
  body(
    header(
      hgroup(
        h1('Expressive JS'),
        h2('An Experiment in Functional JavaScript'))),
    content(location.pathname)))
