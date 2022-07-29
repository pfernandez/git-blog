import md from './markdown.js'

export default (posts, path) =>
  article(md(posts[path].filename))
