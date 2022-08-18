import post from '../post.js'

const renderPost = () => update(post(location.pathname))

on('popstate', renderPost)

const basePath =
  (segments = split(location.pathname, '/')) =>
    length(segments) > 2 ? '/' + second(segments) : ''

export default ([_, {path, title}]) =>
  a({onclick: () => navigateTo(basePath() + path, renderPost)},
    title)

