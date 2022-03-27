import md from './markdown.js'
import posts from '../posts/index.js'

export default pathname => md(posts[pathname].filename)
