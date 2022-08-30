import md from './markdown.js'

const fileName = path =>
  path === '/' ? 'home.md' : last(split(path, '/')) + '.md'

export default (path = location.pathname) =>
  createElement('post', article(md(fileName(path))))

