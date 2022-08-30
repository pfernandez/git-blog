import post from '../post.js'
import sidebar from './sidebar.js'

const isFolder = (path = location.pathname) =>
  path.length > 1 && path.endsWith('/')

const renderItem = () =>
  isFolder() ? sidebar('.') : update(post())

on('popstate', renderItem)

const basePath = (path, name) =>
  name === 'home'
    ? '/'
    : (isFolder() ? path : '/') + name

export default (path, name) =>
  a({onclick: () => navigateTo(
    log('navigateTo', basePath(path, name)), renderItem)}, name)

