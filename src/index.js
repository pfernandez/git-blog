import './expressive/global.js'
import home from './pages/home.js'

html(
  head(
    title('Expressive'),
    link({ rel: 'icon', href: 'img/favicon.ico' })),
  body(
    { style:
      { background: '#222',
        color: '#eee', } },
    header(
      h1('Expressive JS')),
    main(
      home())))

