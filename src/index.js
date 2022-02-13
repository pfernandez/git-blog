import './expressive/global.js'
import home from './pages/home.js'

html(
  head(
    title('Expressive'),
    link({ rel: 'icon', href: 'img/favicon.ico' }),
    link({ rel: 'stylesheet', href: 'pico.classless.css' }),
    link({ rel: 'stylesheet', href: 'style.css' })
  ),
  body(
    header(
      hgroup(
        h1('Expressive JS'),
        h2('An experiment in pure, functional JavaScript'))),
    main(
      home())))

