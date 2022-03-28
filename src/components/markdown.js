import hljs from '../lib/highlight/es/core.min.js'
import javascript from '../lib/highlight/es/languages/javascript.min.js'

const { registerLanguage, highlight } = hljs

registerLanguage('javascript', javascript)

const md = (props = {}, markdown = '') => createElement('md', props, markdown)

const render = (markdown, props) =>
  update(md(
    { innerHTML: markdownit(
      { html: true,
        linkify: true,
        typographer: true,
        highlight: (str, language) =>
          highlight(str, { language }).value })
    .render(markdown),
      ...props }))

export default (markdown, props) =>
  (fetch(markdown).then(response => response.text())
                  .then(markdown => render(markdown, props)),
  md(props, markdown))

