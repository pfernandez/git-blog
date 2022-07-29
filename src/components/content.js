import md from './markdown'
import post from './post'
import sidebar from './sidebar'

const content = (posts, path) =>
  posts
    ? main(nav(sidebar(posts)), post(posts, path))
    : 'Loading...'

export default pathname =>
  (fetch('/posts/posts.json')
    .then(res => res.json())
    .then(posts => update(content(posts, pathname))),
  content())
