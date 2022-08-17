import sidebar from './sidebar.js'

const renderItems = name =>
  import('/posts/' + name + '/index.js')
    .then(response => update(sidebar(response.default)))

export default ([name]) =>
  a({onclick: () => renderItems(name)}, name + '/')

