import hljs from '../lib/highlight/es/core.min.js'
import javascript from '../lib/highlight/es/languages/javascript.min.js'

hljs.registerLanguage('javascript', javascript)

const md = props => element('md', props)

const render = (markdown, props) =>
  md({ innerHTML:
    markdownit({ html: true,
                 linkify: true,
                 typographer: true,
                 highlight: (str, language) =>
                   hljs.highlight(str, { language }).value })
                       .render(markdown),
       ...props })

export default (markdown, props) =>
  (fetch(markdown).then(response => response.text())
                  .then(markdown => render(markdown, props))
                  .catch(() => render(markdown, props)),
  md(props))

