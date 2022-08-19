import sidebar from './sidebar.js'

const prependFolder = (name, index) =>
  omap(index, (key, value) =>
    value.path
      ? {[name + '/' + key]: {...value, path: '/' + name + value.path}}
      : {[key]: value})

const renderItems = name =>
  import('/posts/' + name + '/index.js')
    .then(response =>
      update(sidebar(prependFolder(name, response.default))))

// TODO:
// * Pass index to post component instead of importing posts/index.js
// * Multiple folders
// * Recursive folders
export default ([name]) =>
  a({onclick: () => renderItems(name)}, name + '/')

