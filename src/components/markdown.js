import hljs from '../lib/highlight/es/core.min.js'
import javascript from '../lib/highlight/es/languages/javascript.min.js'

const { registerLanguage, highlight } = hljs

registerLanguage('javascript', javascript)

const config =
  { html: true,
    linkify: true,
    typographer: true,
    highlight: (str, language) => highlight(str, { language }).value }

const md = (markdown = '', props = {}) =>
  createElement('md', { innerHTML: markdownit(config).render(markdown),
                        ...props })

export default (markdown, props) =>
  (fetch(markdown).then(response => response.text())
                  .then(markdown => update(md(markdown, props)))
                  .catch(markdown => update(md(markdown, props))),
  md('', props))

