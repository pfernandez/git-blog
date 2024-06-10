import md from './markdown.js'

// TODO? Pass pathname in through shared data defined at the app root.
const filePath = (pathname = location.pathname) =>
  pathname === '/' ? 'home.md' : pathname.split('/').slice(-1) + '.md'

export default () =>
  createElement('post', article(md(filePath())))

