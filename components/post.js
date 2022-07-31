import md from './markdown.js'
import posts from '../posts/index.js'

const isPost = (path, basename) =>
  basename === '' ? path === '/' : path === basename

const fileName = pathname =>
  find(keys(posts),
       name => isPost(posts[name].path, '/' + last(split(pathname, '/'))))

export default pathname =>
  createElement('post', article(md('posts/' + fileName(pathname))))
