import post from '../post.js'
import sidebar from './sidebar.js'

const renderItem = () =>
  urlParam('nav') ? sidebar('.') : update(post())

on('popstate', renderItem)

// FIXME: Loading module from “http://localhost:3000/a-folder/index.js” was blocked because of a disallowed MIME type (“text/html”).
// urlParam(nav) should be /posts/a-folder/index.js
const urlPath = name =>
  urlParam('nav') + (name === 'home' ? '/' : name)

const basePath = name =>
  name === 'home' ? '/' : '/' + name

const currentBasePath = (path = location.pathname) =>
  path.split('/').slice(0, 2).join()

const isDirectory = name => name.endsWith('/')

export default name =>
  a({onclick: () =>
    isDirectory(name)
      ? log(name, 'is a directory', currentBasePath() === location.pathname)
        ? log('not sure this is possible')
        : urlParam('nav', urlPath(name), false)  // TODO: go to definition for globals?
      : log(name, 'is not a directory', navigateTo(urlPath(name), renderItem))},
    name)

