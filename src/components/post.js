import posts from '../posts/index.js'

export default pathname => posts[pathname]()
