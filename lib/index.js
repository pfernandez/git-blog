'use strict'

require('./lib/expressive/global.js')

var _index = _interopRequireDefault(require('./posts/index.js'))

var _post = _interopRequireDefault(require('./components/post.js'))

var _sidebar = _interopRequireDefault(require('./components/sidebar.js'))

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

html(head(title('Expressive'), meta({
  name: 'viewport',
  content: 'width=device-width, initial-scale=1'
}), link({
  rel: 'icon',
  href: 'img/favicon.ico'
}), link({
  rel: 'stylesheet',
  href: 'style.css'
}), link({
  rel: 'stylesheet',
  href: 'lib/highlight/styles/github.min.css'
})), body(header(hgroup(h1('Expressive JS'), h2('An Experiment in Functional JavaScript'))), nav((0, _sidebar['default'])(_index['default'])), main((0, _post['default'])(pathname))))
