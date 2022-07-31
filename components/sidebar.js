import post from './post.js'

const renderPost = () =>
  update(post(location.pathname))

on('popstate', renderPost)

const basePath = segments =>
  length(segments) > 2 ? '/' + second(segments) : ''

const resolve = path =>
  basePath(split(location.pathname, '/')) + path

const postButton = ([_, {path, title}]) =>
  li(button({onclick: () => navigateTo(resolve(path), renderPost)}, title))

export default posts =>
  ul(map(entries(posts), p => postButton(p)))
