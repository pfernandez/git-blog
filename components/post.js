import md from './markdown.js'
import posts from '../posts/index.js'

console.log(posts)
console.log(location.pathname)

export default pathname =>
  createElement('post', article(md(posts[location.pathname].filename)))
