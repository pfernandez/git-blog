import md from './markdown.js'
import posts from '../posts/index.js'

console.log(posts[pathname].filename)

export default pathname =>
  createElement('post', article(md(posts[pathname].filename)))
