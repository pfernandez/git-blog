import post from '../post.js'
import sidebar from './sidebar.js'

const renderItem = () =>
  urlParam('directory') ? sidebar('.') : update(post())

on('popstate', renderItem)

const urlPath = name =>
  urlParam('directory') + (name === 'home' ? '/' : name)

const basePath = name =>
  name === 'home' ? '/' : '/' + name

const isFolder = path =>
  path.length > 1 && path.endsWith('/')

export default name =>
  a({onclick: () =>
    isFolder(log('isFolder', basePath(name)))
      ? urlParam('directory', urlPath(name))
      : navigateTo(urlPath(name), renderItem)}, name)

